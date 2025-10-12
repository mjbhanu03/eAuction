// src/admin/Pages/RequestedBids.jsx
import { CheckCircle, XCircle } from "lucide-react";

export default function RequestedBids() {
  // Dummy data for UI preview
  const bids = [
    {
      _id: "1",
      itemName: "Antique Gold Coin",
      sellerName: "Rahul Sharma",
      price: 100000,
      imageUrl: "https://via.placeholder.com/150",
      proofUrl: "https://via.placeholder.com/600x400?text=Proof+Document",
    },
    {
      _id: "2",
      itemName: "Vintage Car",
      sellerName: "Neha Verma",
      price: 500000,
      imageUrl: "https://via.placeholder.com/150",
      proofUrl: "https://via.placeholder.com/600x400?text=Car+Proof",
    },
  ];

  const approveBid = (id) => {
    alert(`Approve Bid ID: ${id} (UI only)`);
  };

  const rejectBid = (id) => {
    alert(`Reject Bid ID: ${id} (UI only)`);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-6 text-[#0b3d91]">Requested Bids</h1>
      <p className="text-gray-600 mb-8">
        Review seller-submitted items before approving them for auction.
      </p>

      {/* Bids List */}
      <div className="grid gap-6">
        {bids.map((bid) => (
          <div
            key={bid._id}
            className="bg-white shadow-lg rounded-xl p-5 flex gap-6 items-center hover:shadow-xl transition"
          >
            {/* Product Image */}
            <img
              src={bid.imageUrl}
              alt={bid.itemName}
              className="w-32 h-32 object-cover rounded-lg border"
            />

            {/* Details */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                {bid.itemName}
              </h2>
              <p className="text-sm text-gray-600">Seller: {bid.sellerName}</p>
              <p className="text-sm text-gray-600">
                Price: <span className="font-semibold">₹{bid.price.toLocaleString()}</span>
              </p>
              <p className="text-sm text-gray-600">
                Proof:{" "}
                <a
                  href={bid.proofUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View Document
                </a>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => approveBid(bid._id)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <CheckCircle size={18} /> Approve
              </button>
              <button
                onClick={() => rejectBid(bid._id)}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <XCircle size={18} /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
