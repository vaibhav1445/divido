const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Expense = require('../models/expense');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

//Authentication Middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

//Add Expense (POST /api/expenses)
router.post('/add',auth, async (req, res) => {
  try {
    const { title, amount, participants, dueDate } = req.body;

    // 🟢 Convert participants.user to ObjectId
    const formattedParticipants = participants.map((p) => ({
      user: new mongoose.Types.ObjectId(p.user),
      share: p.share,
      paid: p.paid || false,
      email: p.email, // include email for notification
    }));

    const expense = await Expense.create({
      title,
      amount,
      createdBy: req.user,
      participants: formattedParticipants,
      dueDate,
    });

    // ✅ Send email to all participants
    for (const participant of participants) {
      if (participant.email) {
        const emailText = `
Hi,

You have been added to a new expense "${title}" with a share of ₹${participant.share}.
Please make the payment by: ${new Date(dueDate).toLocaleDateString()}.

- Divido Team
        `;
        await sendEmail(participant.email, `New Expense Added: ${title}`, emailText);
      }
    }

    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error while adding expense' });
  }
});


//Get All Expenses Created by User (GET /api/expenses)
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ createdBy: req.user })
  .populate('participants.user', 'username email');  // adjust based on your User schema
res.json(expenses);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error while fetching expenses' });
  }
});
router.patch('/:expenseId/mark-paid', async (req, res) => {
  try {
    const { expenseId } = req.params;
    const { participantId } = req.body;

    if (!participantId) {
      return res.status(400).json({ msg: 'participantId is required' });
    }

    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ msg: 'Expense not found' });
    }

    const participant = expense.participants.find((p) => p.user.toString() === participantId);
    if (!participant) {
      return res.status(404).json({ msg: 'Participant not found in this expense' });
    }

    participant.paid = true;
    await expense.save();

    res.json({ msg: 'Participant marked as paid', expense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error while marking as paid' });
  }
});



module.exports = router;
