// src/admin/Pages/ActiveBids.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ActiveBids() {
  const navigate = useNavigate();

  // Dummy active bids (replace with backend data later)
  const [bids] = useState([
    {
      id: 1,
      item: "Luxury Car Auction",
      highestBid: 850000,
      bidders: 12,
      endTime: "2025-10-10 18:00",
    },
    {
      id: 2,
      item: "Villa Property Auction",
      highestBid: 12500000,
      bidders: 7,
      endTime: "2025-10-12 20:00",
    },
    {
      id: 3,
      item: "Antique Watch Auction",
      highestBid: 45000,
      bidders: 22,
      endTime: "2025-10-07 15:00",
    },
  ]);

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-blue-800">🔨 Active Bids</h1>

      {bids.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bids.map((bid) => (
            <motion.div
              key={bid.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/admin/active-bids/${bid.id}`)}
              className="p-6 bg-white rounded-2xl shadow-lg border cursor-pointer"
            >
              <h2 className="font-bold text-gray-800">{bid.item}</h2>
              <p className="text-sm mt-2">
                Highest Bid:{" "}
                <b className="text-green-700">₹{bid.highestBid.toLocaleString()}</b>
              </p>
              <p className="text-sm">Bidders: {bid.bidders}</p>
              <p className="text-xs text-red-600 mt-1">Ends at: {bid.endTime}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-10">No active bids found</p>
      )}
    </motion.div>
  );
}
