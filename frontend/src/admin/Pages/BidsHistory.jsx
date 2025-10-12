// src/admin/Pages/BidsHistory.jsx
import { useEffect, useState } from "react";
import { Archive, Search as SearchIcon, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function BidsHistory() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    // TODO: replace with real fetch('/api/admin/bids-history')
    const timer = setTimeout(() => {
      try {
        // Mock data: list of completed auctions
        const mock = [
          {
            itemId: "item-1001",
            itemName: "Antique Gold Coin",
            thumbnail: "https://via.placeholder.com/180",
            finalPrice: 125000,
            currency: "INR",
            winnerName: "Rahul Sharma",
            winnerId: "u4",
            totalBids: 8,
            uniqueBidders: 6,
            startAt: "2025-10-01T09:00:00.000Z",
            endAt: "2025-10-05T10:20:00.000Z",
          },
          {
            itemId: "item-2002",
            itemName: "Vintage Car - Model X",
            thumbnail: "https://via.placeholder.com/180",
            finalPrice: 850000,
            currency: "INR",
            winnerName: "Neha Verma",
            winnerId: "u9",
            totalBids: 12,
            uniqueBidders: 9,
            startAt: "2025-09-20T08:00:00.000Z",
            endAt: "2025-09-28T15:45:00.000Z",
          },
        ];
        setHistory(mock);
        setError(null);
      } catch (e) {
        setError("Failed to load bids history.");
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const filtered = history.filter(
    (h) =>
      h.itemName.toLowerCase().includes(q.toLowerCase()) ||
      h.itemId.toLowerCase().includes(q.toLowerCase()) ||
      (h.winnerName && h.winnerName.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0b3d91] flex items-center gap-3">
            <Archive size={24} /> Bids History
          </h1>
          <p className="text-sm text-gray-600">Completed auctions — view final price, winner and participants.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow">
            <SearchIcon size={16} className="text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by item, id or winner..."
              className="ml-2 outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {loading && <div className="bg-white p-6 rounded-xl shadow text-gray-500">Loading completed auctions...</div>}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">{error}</div>}

      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-gray-600">No completed auctions found.</div>
          ) : (
            <div className="grid gap-4">
              {filtered.map((h) => (
                <div key={h.itemId} className="bg-white shadow-lg rounded-xl p-4 flex gap-4 items-center">
                  <img src={h.thumbnail} alt={h.itemName} className="w-36 h-24 object-cover rounded-md border" />

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">{h.itemName}</h2>
                        <div className="text-sm text-gray-500">ID: {h.itemId}</div>
                        <div className="text-sm text-gray-500">Winner: <span className="font-medium">{h.winnerName}</span></div>
                      </div>

                      <div className="text-right text-sm text-gray-600">
                        <div>Final: <span className="font-semibold">₹{h.finalPrice.toLocaleString()} {h.currency}</span></div>
                        <div>Total bids: {h.totalBids}</div>
                        <div>Participants: {h.uniqueBidders}</div>
                        <div className="mt-1 text-xs text-gray-400">{new Date(h.endAt).toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-end gap-2">
                      <Link to={`/admin/bids-history/${h.itemId}`} className="flex items-center gap-2 px-3 py-2 bg-[#0b3d91] text-white rounded-lg">
                        <Eye size={16} /> View History
                      </Link>
                    </div>
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
