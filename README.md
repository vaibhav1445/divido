# 🪙 Divido – Expense Splitter App

Divido is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to help users **add**, **manage**, and **split shared expenses** with friends, family, or roommates. It supports **email notifications**, **UPI-based QR payments**, and will soon include **Razorpay integration** for seamless real-time payments.

---

## 📌 Features

### ✅ Expense Management
- Add shared expenses with multiple participants
- Assign individual shares
- Track due dates for payments
- View total, pending, and individual expenses

### ✅ Email Notifications
- Automatically sends email to participants when an expense is added
- Email includes amount, due date, and expense description

### ✅ UPI QR Code Payment (Showcase)
- Each user can scan a UPI QR code to pay their share
- Option to mark a payment as done manually

### ✅ Razorpay Integration (🔧 In Progress)
> Razorpay payment gateway integration is under development. Soon users will be able to:
> - Pay their expense share online securely
> - Get payment confirmation instantly
> - Track payment history

---

## 🚀 Tech Stack

| Frontend  | Backend   | Database | Authentication | Mailing   |
|-----------|-----------|----------|----------------|-----------|
| React     | ExpressJS | MongoDB  | JWT            | Nodemailer|

---

## 📂 Folder Structure

root
│
├── backend/
│ ├── routes/
│ ├── models/
│ ├── controllers/
│ └── utils/
│
├── frontend/
│ ├── components/
│ ├── pages/
│ └── utils/
│
├── .env
├── package.json
└── README.md


---

## 🔐 Environment Variables

Create a `.env` file in the root of your `backend/` with the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
RAZORPAY_KEY_ID=your_razorpay_key_id  # (for later use)
RAZORPAY_KEY_SECRET=your_razorpay_key_secret  # (for later use)


🧪 Upcoming Features

✅ Razorpay payment integration
🔄 Payment status sync with Razorpay
📱 PWA support (Installable App)
📊 Analytics Dashboard (Total spent, top contributors)

