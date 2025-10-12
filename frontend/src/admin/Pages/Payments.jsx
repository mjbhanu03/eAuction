import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Payments() {
  // Dummy data: items with users who paid entry fee
  const [items] = useState([
    {
      id: 1,
      name: "Luxury Car Auction",
      users: [
        { id: "u1", name: "Amit Sharma", email: "amit@example.com", amount: 500 },
        { id: "u2", name: "Rahul Mehta", email: "rahul@example.com", amount: 500 },
      ],
    },
    {
      id: 2,
      name: "Villa Property Auction",
      users: [
        { id: "u3", name: "Sneha Desai", email: "sneha@example.com", amount: 500 },
        { id: "u4", name: "Arjun Patel", email: "arjun@example.com", amount: 500 },
        { id: "u5", name: "Pooja Nair", email: "pooja@example.com", amount: 500 },
      ],
    },
  ]);

  const navigate = useNavigate();

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-blue-800">💰 Entry Payments by Item</h1>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/admin/payments/${item.id}`)}
              className="p-6 bg-white rounded-2xl shadow-lg border cursor-pointer"
            >
              <h2 className="font-bold text-gray-800">{item.name}</h2>
              <p className="text-sm mt-2">
                Users Paid:{" "}
                <b className="text-blue-700">{item.users.length}</b>
              </p>
              <p className="mt-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 w-fit">
                ₹500 each
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-10">No items found</p>
      )}
    </motion.div>
  );
}
