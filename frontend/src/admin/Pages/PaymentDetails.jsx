import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PaymentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Dummy data (replace with backend later)
    const dummyItems = {
      1: {
        id: 1,
        name: "Luxury Car Auction",
        users: [
          { id: "u1", name: "Amit Sharma", email: "amit@example.com", amount: 500 },
          { id: "u2", name: "Rahul Mehta", email: "rahul@example.com", amount: 500 },
        ],
      },
      2: {
        id: 2,
        name: "Villa Property Auction",
        users: [
          { id: "u3", name: "Sneha Desai", email: "sneha@example.com", amount: 500 },
          { id: "u4", name: "Arjun Patel", email: "arjun@example.com", amount: 500 },
          { id: "u5", name: "Pooja Nair", email: "pooja@example.com", amount: 500 },
        ],
      },
    };

    setItem(dummyItems[id]);
  }, [id]);

  if (!item)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <motion.div
      className="max-w-3xl mx-auto p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
      >
        ⬅️ Back to Items
      </button>

      {/* Item Header */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
        <p className="text-gray-600">
          Total Users Paid: <b>{item.users.length}</b>
        </p>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {item.users.map((u) => (
          <motion.div
            key={u.id}
            whileHover={{ scale: 1.03 }}
            className="p-5 bg-white rounded-xl shadow-md border"
          >
            <h2 className="font-bold text-gray-800">{u.name}</h2>
            <p className="text-sm text-gray-600">{u.email}</p>
            <p className="text-sm mt-2">
              Amount: <b>₹{u.amount}</b>
            </p>
            <p className="mt-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 w-fit">
              Paid
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
