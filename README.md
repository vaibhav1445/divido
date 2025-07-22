# 🪙 Divido – Expense Splitter App

**Divido** is a full-stack **MERN** application designed to simplify expense splitting among friends, family, or roommates. With seamless **Stripe integration**, **email notifications**, and real-time payment tracking, Divido ensures every shared cost is managed transparently and efficiently.

---

## 🚀 Features

### ✅ Expense Management
- Add shared expenses with descriptions and amounts
- Assign individual shares to multiple participants
- Track total, pending, and paid amounts
- Due date reminders and status updates
- Manual payment marking

### 📧 Email Notifications
- Automated email sent to all involved participants
- Email includes amount, due date, and expense breakdown
- Uses **Nodemailer** for secure delivery

### 💳 Stripe Payment Integration
- Secure and user-friendly **Stripe Checkout**
- Users can pay their share directly using card or UPI (via Stripe)
- Real-time payment status and success confirmation
- Webhook support for backend validation
- Billing information handled via Stripe UI

### 📱 Responsive Frontend
- Clean UI built using **React + Tailwind CSS**
- Fully responsive and mobile-friendly

---

## 🛠️ Tech Stack

| Frontend      | Backend     | Database | Auth       | Mailing     | Payments     |
|---------------|-------------|----------|------------|-------------|--------------|
| React         | Express.js  | MongoDB  | JWT        | Nodemailer  | **Stripe**   |

---

## 📁 Folder Structure

divido/
├── backend/
│ ├── routes/
│ ├── models/
│ ├── controllers/
│ ├── middlewares/
│ ├── utils/
│ └── server.js
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── context/
│ └── App.js
├── .env
├── package.json
└── README.md

🔮 Upcoming Features
 
 Stripe Integration with real-time webhooks

 Group Expense Reports & Analytics Dashboard

 Expense Settlements and History

 Notifications via WhatsApp (Twilio integration)

 PWA support (Installable App)

 Multi-currency support

📦 Installation Guide

🔧 Prerequisites

Node.js & npm

MongoDB Atlas or local MongoDB

Stripe Account

📥 Clone the Repository

git clone https://github.com/vaibhav1445/divido.git

cd divido

📦 Backend Setup

cd backend

npm install

npm start


🖥️ Frontend Setup

cd frontend

npm install

npm run dev

📸 Demo Screenshots

🧾 Add Expense Page

📧 Email Notification Sample

💳 Stripe Checkout Page

📊 Expense Dashboard


📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
