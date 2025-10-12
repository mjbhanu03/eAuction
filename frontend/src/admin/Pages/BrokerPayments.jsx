// src/admin/Pages/BrokerPayments.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function BrokerPayments() {
  const navigate = useNavigate();

  const [payments] = useState([
    { id: 1, seller: "Ramesh Traders", finalAmount: 100000, status: "Pending" },
    { id: 2, seller: "Mehta & Sons", finalAmount: 500000, status: "Approved" },
    { id: 3, seller: "Desai Enterprises", finalAmount: 250000, status: "Pending" },
  ]);

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-blue-800">💰 Broker Payments</h1>

      <div className="grid gap-4">
        {payments.map((p) => {
          const commission = (p.finalAmount * 1) / 100; // always 1%
          return (
            <div
              key={p.id}
              className="flex items-center justify-between bg-white p-5 rounded-xl shadow-md border hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/admin/broker-payments/${p.id}`)}
            >
              <div>
                <h2 className="font-semibold text-gray-800">{p.seller}</h2>
                <p className="text-sm text-gray-500">
                  Final Amount: ₹{p.finalAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Broker Fee (1%): <span className="text-green-600 font-semibold">₹{commission.toLocaleString()}</span>
                </p>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  p.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {p.status}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
