import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { PlusCircle, Loader2, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const [participants, setParticipants] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      const res = await axiosInstance.get(`/auth/search?query=${value}`);
      setSearchResults(res.data);
    } catch (err) {
      console.error(err);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const addParticipant = (user) => {
    const exists = participants.find((p) => p.user === user._id);
    if (exists) return;

    const share = prompt(`Enter share amount for ${user.name}:`);
    const shareAmount = parseFloat(share);

    if (!share || isNaN(shareAmount) || shareAmount <= 0) {
      alert("Invalid amount");
      return;
    }

    setParticipants((prev) => [
      ...prev,
      {
        user: user._id,
        name: user.name,
        email: user.email,
        share: shareAmount,
      },
    ]);
    setSearchQuery("");
    setSearchResults([]);
  };

  const removeParticipant = (userId) => {
    setParticipants((prev) => prev.filter((p) => p.user !== userId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        title.trim() === "" ||
        isNaN(parseFloat(amount)) ||
        parseFloat(amount) <= 0 ||
        dueDate.trim() === "" ||
        participants.length === 0
      ) {
        throw new Error("Please fill all fields properly and add at least one participant.");
      }

      const payload = {
        title: title.trim(),
        amount: parseFloat(amount),
        dueDate,
        participants: participants.map((p) => ({
          user: p.user,
          share: p.share,
          email: p.email,
        })),
      };

      const res = await axiosInstance.post("/expenses/add", payload);

      toast.success("Expense added successfully");

      // Reset form fields
      setTitle("");
      setAmount("");
      setDueDate("");
      setParticipants([]);

      // Navigate to dashboard after delay to show notification
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      toast.error(err.response?.data?.msg || err.message || "❌ Error adding expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6 relative">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-indigo-700">
        <PlusCircle size={28} /> Add New Expense
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-5">
        {/* Title */}
        <div>
          <label className="block mb-1 text-gray-600 font-medium">Title</label>
          <input
            type="text"
            placeholder="e.g., Shami's Birthday"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 text-gray-600 font-medium">Total Amount</label>
          <input
            type="number"
            placeholder="e.g., 1500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Participants */}
        <div>
          <label className="block mb-1 text-gray-600 font-medium">Add Participants</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searching && <Search className="absolute right-3 top-3 animate-spin" size={18} />}
            {searchResults.length > 0 && (
              <div className="absolute z-10 bg-white border rounded-xl shadow max-h-48 overflow-auto w-full mt-1">
                {searchResults.map((user) => (
                  <button
                    type="button"
                    key={user._id}
                    onClick={() => addParticipant(user)}
                    className="w-full text-left px-4 py-2 hover:bg-indigo-50"
                  >
                    {user.name} ({user.email})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Participant List */}
        {participants.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-3 border">
            <h3 className="font-medium text-gray-700 mb-2">Participants:</h3>
            <ul className="space-y-1 text-gray-800 text-sm">
              {participants.map((p) => (
                <li key={p.user} className="flex justify-between items-center">
                  <span>
                    {p.name} ({p.email}): ₹{p.share.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeParticipant(p.user)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Due Date */}
        <div>
          <label className="block mb-1 text-gray-600 font-medium">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || participants.length === 0}
          className="w-full bg-indigo-600 text-white rounded-xl px-4 py-2 font-semibold flex justify-center items-center gap-2 hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
