import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import ExpenseList from "../components/Expenses/ExpenseList";
import {
  LogOut,
  Plus,
  Home,
  Wallet,
  UserCircle2,
  IndianRupee,
} from "lucide-react";

// Function to decode JWT and get user ID
const getUserIdFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const userId = getUserIdFromToken(); 

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/expenses");
      setExpenses(response.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete expense");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const location = useLocation();

useEffect(() => {
  const query = new URLSearchParams(location.search);
  if (query.get("refresh") === "true") {
    fetchExpenses();
  }
}, [location.search, fetchExpenses]);

  // Calculate user's unpaid amount
  const myUnpaidAmount = expenses
    .flatMap((exp) => exp.participants)
    .filter((p) => !p.paid && String(p.user._id) === String(userId))
    .reduce((total, p) => total + (p.share || 0), 0);

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalPendingPayments = expenses
    .flatMap((exp) => exp.participants)
    .filter((p) => !p.paid).length;



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📋 Dashboard</h1>
        <button
          onClick={() => navigate("/profile")}
          className="hover:text-blue-600"
          title="Profile"
        >
          <UserCircle2 size={32} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <button
          onClick={() => setActiveSection("home")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
            activeSection === "home" ? "bg-blue-600 text-white" : "bg-white"
          } hover:bg-blue-100`}
        >
          <Home size={18} />
          Home
        </button>

        <button
          onClick={() => setActiveSection("myExpenses")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
            activeSection === "myExpenses"
              ? "bg-blue-600 text-white"
              : "bg-white"
          } hover:bg-blue-100`}
        >
          <Wallet size={18} />
          My Expenses
        </button>

        <button
          onClick={() => navigate("/add-expense")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-green-600 text-white hover:bg-green-700"
        >
          <Plus size={18} />
          Add Expense
        </button>

        <button
          onClick={() =>
            navigate("/payment-section", {
              state: {
                amount: myUnpaidAmount,
                title: "My Unpaid Amount",
                onPaymentSuccess: fetchExpenses.toString(), // passing callback identifier
              },
            })
          }
          className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-orange-600 text-white hover:bg-orange-700"
        >
          <IndianRupee size={18} />
          Make Payment
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-red-600 text-white hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Sections */}
      {activeSection === "home" && (
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Welcome to Divido 🪙</h2>
          <p className="text-gray-600 mb-4">
            <strong>Divido</strong> helps you manage shared expenses
            effortlessly. Track your expenses, split bills with friends, and
            never miss a payment!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-100 rounded-xl">
              <p className="text-gray-500">Total Expenses Created</p>
              <p className="text-xl font-bold">{expenses.length}</p>
            </div>

            <div className="p-4 bg-purple-100 rounded-xl">
              <p className="text-gray-500">Total Amount (All)</p>
              <p className="text-xl font-bold">₹{totalAmount}</p>
            </div>

            <div className="p-4 bg-green-100 rounded-xl">
              <p className="text-gray-500">My Amount to be Paid</p>
              <p className="text-xl font-bold">₹{myUnpaidAmount}</p>
            </div>

            <div className="p-4 bg-yellow-100 rounded-xl">
              <p className="text-gray-500">Pending Payments (All)</p>
              <p className="text-xl font-bold">{totalPendingPayments}</p>
            </div>
          </div>
        </div>
      )}

      {activeSection === "myExpenses" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">💼 My Expenses</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <ExpenseList expenses={expenses} onDelete={handleDelete} />
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
