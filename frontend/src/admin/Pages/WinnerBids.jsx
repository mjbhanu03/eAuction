// src/admin/Pages/WinnerBids.jsx
import { useEffect, useState } from "react";
import { Trophy, Eye, Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function WinnerBids() {
  const [loading, setLoading] = useState(true);
  const [winnerBids, setWinnerBids] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your real API endpoint. For now we mock a delayed response.
    const timer = setTimeout(() => {
      try {
        // Mock data — replace /api/admin/winner-bids with your backend
        const data = [
          {
            _id: "w1",
            itemName: "Antique Gold Coin",
            winnerName: "Rahul Sharma",
            winnerEmail: "rahul@example.com",
            winnerPhone: "+91-99999-00001",
            winnerAddress: "Plot 12, MG Road, Ahmedabad, 380001",
            winningAmount: 125000,
            currency: "INR",
            imageUrl: "https://via.placeholder.com/160",
            winDate: "2025-10-05T10:20:00.000Z",
            invoiceUrl: "/invoices/w1.pdf"
          },
          {
            _id: "w2",
            itemName: "Vintage Car - Model X",
            winnerName: "Neha Verma",
            winnerEmail: "neha@example.com",
            winnerPhone: "+91-99999-00002",
            winnerAddress: "Flat 5B, Park Street, Mumbai, 400001",
            winningAmount: 850000,
            currency: "INR",
            imageUrl: "https://via.placeholder.com/160",
            winDate: "2025-09-28T15:45:00.000Z",
            invoiceUrl: "/invoices/w2.pdf"
          }
        ];
        setWinnerBids(data);
        setError(null);
      } catch (e) {
        setError("Failed to load winner bids.");
      } finally {
        setLoading(false);
      }
    }, 500); // simulate network
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#0b3d91] flex items-center gap-3">
          <Trophy size={22} /> Winner Bids
        </h1>
        <div className="text-sm text-gray-600">{winnerBids.length} results</div>
      </div>

      {loading && (
        <div className="bg-white rounded-xl p-6 shadow text-gray-500">Loading winner bids...</div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-4">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {winnerBids.length === 0 ? (
            <div className="bg-white rounded-xl p-6 shadow text-gray-600">No winner bids found.</div>
          ) : (
            <div className="grid gap-6">
              {winnerBids.map((wb) => (
                <div key={wb._id} className="bg-white shadow-lg rounded-xl p-4 flex gap-6 items-center hover:shadow-xl transition">
                  <img
                    src={wb.imageUrl}
                    alt={wb.itemName}
                    className="w-36 h-28 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">{wb.itemName}</h2>
                        <p className="text-sm text-gray-600">Winner: <span className="font-medium">{wb.winnerName}</span></p>
                        <p className="text-sm text-gray-600">Amount: <span className="font-semibold">₹{wb.winningAmount.toLocaleString()}</span></p>
                        <p className="text-sm text-gray-500 mt-1">Won on: <span>{new Date(wb.winDate).toLocaleString()}</span></p>
                      </div>

                      <div className="text-right text-sm text-gray-500">
                        <div>{wb.winnerEmail}</div>
                        <div className="mt-1">{wb.winnerPhone}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Link
                      to={`/admin/winner-bids/${wb._id}`}
                      className="flex items-center gap-2 px-3 py-2 bg-[#0b3d91] text-white rounded-lg"
                    >
                      <Eye size={16} /> View
                    </Link>

                    <a href={wb.invoiceUrl} className="flex items-center gap-2 px-3 py-2 border rounded-lg" target="_blank" rel="noreferrer">
                      <Download size={16} /> Invoice
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
