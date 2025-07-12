const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true // ✅ helps prevent accidental spaces
  },
  amount: { 
    type: Number, 
    required: true, 
    min: 0 // ✅ makes sure amount cannot be negative
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  participants: [{
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true // ✅ ensures every participant has a user
    },
    share: { 
      type: Number, 
      required: true, 
      min: 0 // ✅ ensure share is a positive number
    },
    paid: { 
      type: Boolean, 
      default: false 
    }
  }],
  dueDate: { 
    type: Date, 
    required: true // ✅ better to require dueDate for tracking
  }
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
