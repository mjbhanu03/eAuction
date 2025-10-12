// src/admin/Pages/BrokerPaymentDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BrokerPaymentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    // Dummy DB (replace with backend later)
    const dummy = {
      1: { id: 1, seller: "Ramesh Traders", finalAmount: 100000, status: "Pending" },
      2: { id: 2, seller: "Mehta & Sons", finalAmount: 500000, status: "Approved" },
      3: { id: 3, seller: "Desai Enterprises", finalAmount: 250000, status: "Pending" },
    };
    setPayment(dummy[id]);
  }, [id]);

  if (!payment) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  const commission = (payment.finalAmount * 1) / 100;

  const handleApprove = () => {
    alert("✅ Broker Payment Approved!");
    navigate(-1);
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
      >
        ⬅ Back
      </button>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Broker Payment Details</h2>
        <p><b>Seller:</b> {payment.seller}</p>
        <p><b>Final Amount:</b> ₹{payment.finalAmount.toLocaleString()}</p>
        <p><b>Broker Fee (1%):</b> ₹{commission.toLocaleString()}</p>
        <p>
          <b>Status:</b>{" "}
          <span
            className={`px-2 py-1 rounded ${
              payment.status === "Approved"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {payment.status}
          </span>
        </p>

        {payment.status !== "Approved" && (
          <button
            onClick={handleApprove}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl shadow hover:bg-blue-700"
          >
            ✅ Approve Payment
          </button>
        )}
      </div>
    </motion.div>
  );
}
