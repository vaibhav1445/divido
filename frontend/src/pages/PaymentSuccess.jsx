import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your payment. Everything looks good now.</p>
        <Link
          to="/dashboard?refresh=true"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
