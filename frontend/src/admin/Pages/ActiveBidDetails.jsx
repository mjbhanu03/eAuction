// src/admin/Pages/ActiveBidDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ActiveBidDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bid, setBid] = useState(null);

  useEffect(() => {
    // Dummy data (replace with backend)
    const dummyData = {
      1: {
        id: 1,
        item: "Luxury Car Auction",
        highestBid: 850000,
        bidders: [
          { name: "Amit Sharma", bid: 850000 },
          { name: "Rahul Mehta", bid: 800000 },
          { name: "Sneha Desai", bid: 750000 },
        ],
        endTime: "2025-10-10 18:00",
      },
      2: {
        id: 2,
        item: "Villa Property Auction",
        highestBid: 12500000,
        bidders: [
          { name: "Pooja Nair", bid: 12500000 },
          { name: "Arjun Patel", bid: 12000000 },
        ],
        endTime: "2025-10-12 20:00",
      },
    };

    setBid(dummyData[id]);
  }, [id]);

  if (!bid)
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
        ⬅️ Back to Active Bids
      </button>

      {/* Item Info */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">{bid.item}</h1>
        <p className="text-gray-600 mb-2">
          Ends at: <b>{bid.endTime}</b>
        </p>
        <p className="text-lg font-semibold text-green-700">
          Current Highest Bid: ₹{bid.highestBid.toLocaleString()}
        </p>
      </div>

      {/* Bidders List */}
      <div className="grid gap-4">
        {bid.bidders.map((b, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white rounded-xl shadow-md border"
          >
            <h2 className="font-bold text-gray-800">{b.name}</h2>
            <p className="text-sm">Bid: ₹{b.bid.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
