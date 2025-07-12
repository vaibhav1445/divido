import React, { useEffect, useState } from "react";
import { Calendar, CheckCircle, XCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(null); // holds participantId when marking paid

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      toast.error("❌ Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleMarkPaid = async (expenseId, participantId) => {
    try {
      setMarking(participantId);
      await axiosInstance.patch(`/expenses/${expenseId}/mark-paid`, {
        participantId,
      });
      toast.success("✅ Marked as Paid");
      fetchExpenses();
    } catch (error) {
      toast.error("❌ Failed to mark as paid");
    } finally {
      setMarking(null);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (expenses.length === 0) return <p className="text-center text-gray-500">No expenses yet.</p>;

  return (
    <div className="max-w-2xl mx-auto my-6 p-4">
      <Toaster position="top-right" />
      <div className="grid gap-4">
        {expenses.map((exp) => (
          <div
            key={exp._id}
            className="bg-white p-5 rounded-2xl shadow border hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-800 capitalize mb-2">{exp.title}</h3>

            <div className="flex items-center text-gray-500 text-sm gap-2 mb-3">
              <Calendar size={16} />
              <span>Due: {new Date(exp.dueDate).toLocaleDateString()}</span>
            </div>

            <div className="mt-2 text-gray-800 font-medium mb-1">Participants:</div>
            <ul className="mt-1 space-y-2">
              {exp.participants.map((p, index) => (
                <li
                  key={index}
                  className="bg-gray-50 px-3 py-2 rounded-lg text-sm"
                >
                  <div className="flex justify-between items-center text-gray-700">
                    <span>{p.user?.email || p.email || p.name || "Unknown"}</span>
                    <span className="font-semibold text-gray-900">₹{Number(p.share).toFixed(2)}</span>
                  </div>

                  <div className="mt-1 text-xs flex items-center gap-2">
                    {p.paid ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle size={14} /> Paid
                      </span>
                    ) : (
                      <>
                        <span className="text-red-500 flex items-center gap-1">
                          <XCircle size={14} /> Not Paid
                        </span>
                        <button
                          onClick={() => handleMarkPaid(exp._id, p.user?._id || p._id)}
                          disabled={marking === (p.user?._id || p._id)}
                          className={`text-indigo-600 text-xs underline hover:text-indigo-800 ${
                            marking === (p.user?._id || p._id) && "opacity-50 cursor-not-allowed"
                          }`}
                        >
                          {marking === (p.user?._id || p._id) ? "Marking..." : "Mark as Paid"}
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
