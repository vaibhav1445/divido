import React from "react";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { amount, title } = location.state || {};

  const upiId = "yourupiid@upi";
  const payeeName = "Your Name";
  const description = title || "Expense Payment";

  if (!amount || !title) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        ⚠️ Payment details not provided.
      </div>
    );
  }

  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount}&cu=INR&tn=${encodeURIComponent(description)}`;

  const handlePaymentDone = () => {
    alert("✅ Payment marked as done!");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow p-6 text-center">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Pay with UPI</h2>

      <p className="text-gray-600 mb-3">
        <strong>Amount:</strong> ₹{amount}
      </p>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="bg-white p-4 rounded-xl inline-block">
        <QRCode value={upiUrl} size={200} />
      </div>

      <div className="mt-6 space-y-3">
        <a
          href={upiUrl}
          className="block bg-indigo-600 text-white rounded-xl px-4 py-2 hover:bg-indigo-700 transition"
        >
          Open in UPI App
        </a>

        <button
          onClick={handlePaymentDone}
          className="block w-full bg-green-600 text-white rounded-xl px-4 py-2 hover:bg-green-700 transition"
        >
          I Have Paid
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;
