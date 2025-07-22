import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, title } = location.state || {};

  const handleStripeCheckout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, title }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        alert("Unable to initiate payment");
      }
    } catch (err) {
      console.error("Stripe error", err);
      alert("Something went wrong!");
    }
  };

  if (!amount || !title) {
    return <div className="text-center text-red-600 p-6">⚠️ No payment details found.</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-md p-6 text-center">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">🔐 Confirm Payment</h2>
      <p className="mb-2 text-gray-600">You're about to pay:</p>
      <p className="text-3xl font-bold mb-4 text-green-700">₹{amount}</p>
      <p className="text-gray-500 mb-6">For: <strong>{title}</strong></p>

      <button
        onClick={handleStripeCheckout}
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
      >
        💳 Pay Now
      </button>

      <div className="mt-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-gray-500 underline hover:text-gray-800"
        >
          ← Cancel & Go Back
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;
