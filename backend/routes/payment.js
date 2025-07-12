// const Razorpay = require('razorpay');
// const express = require('express');
// const router = express.Router();


// // Initialize Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// const auth = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;
//     next();
//   } catch (err) {
//     return res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// // ✅ Create Razorpay Order API (POST /api/expenses/create-order)
// router.post('/create-order', auth, async (req, res) => {
//   try {
//     const { amount, currency = 'INR' } = req.body;

//     if (!amount) {
//       return res.status(400).json({ msg: 'Amount is required' });
//     }

//     const options = {
//       amount: amount * 100,      // Convert to paise (smallest unit of INR)
//       currency,
//       receipt: `receipt_order_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     return res.status(200).json(order);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: 'Server Error while creating order' });
//   }
// });
