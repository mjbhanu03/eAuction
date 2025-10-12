// src/admin/Pages/WinnerBidDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Download, CheckCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function WinnerBidDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetch; replace with real API call: /api/admin/winner-bids/:id
    const timer = setTimeout(() => {
      try {
        // Mock dataset (in real use, fetch by id)
        const mock = {
          w1: {
            _id: "w1",
            itemName: "Antique Gold Coin",
            itemDesc: "Handmade 18k gold coin from 1920s.",
            itemId: "item-1001",
            winnerName: "Rahul Sharma",
            winnerEmail: "rahul@example.com",
            winnerPhone: "+91-99999-00001",
            winnerAddress: "Plot 12, MG Road, Ahmedabad, 380001",
            winningAmount: 125000,
            currency: "INR",
            winDate: "2025-10-05T10:20:00.000Z",
            invoiceUrl: "/invoices/w1.pdf",
            images: ["https://via.placeholder.com/600x400"]
          },
          w2: {
            _id: "w2",
            itemName: "Vintage Car - Model X",
            itemDesc: "Classic 1968 model restored; single owner.",
            itemId: "item-2002",
            winnerName: "Neha Verma",
            winnerEmail: "neha@example.com",
            winnerPhone: "+91-99999-00002",
            winnerAddress: "Flat 5B, Park Street, Mumbai, 400001",
            winningAmount: 850000,
            currency: "INR",
            winDate: "2025-09-28T15:45:00.000Z",
            invoiceUrl: "/invoices/w2.pdf",
            images: ["https://via.placeholder.com/600x400"]
          }
        };

        if (!mock[id]) throw new Error("Winner bid not found");
        setData(mock[id]);
        setError(null);
      } catch (e) {
        setError(e.message || "Failed to load details");
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [id]);

  const handleMarkPaid = async () => {
    // Example optimistic UI: in real app call your PATCH endpoint
    try {
      // await fetch(`/api/admin/winner-bids/${id}/mark-paid`, { method: "POST" })
      alert("Marked as paid (UI only).");
    } catch (e) {
      alert("Failed to mark paid.");
    }
  };

  if (loading) return <div className="p-6 text-gray-500">Loading details...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!data) return null;

  return (
    <motion.div className="max-w-4xl mx-auto p-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            <img src={data.images?.[0]} alt={data.itemName} className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-2xl font-semibold">{data.itemName}</h2>
            <p className="text-gray-700">{data.itemDesc}</p>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div><b>Item ID:</b> {data.itemId}</div>
              <div><b>Win Date:</b> {new Date(data.winDate).toLocaleString()}</div>
              <div><b>Winning Amount:</b> ₹{data.winningAmount.toLocaleString()} {data.currency}</div>
              <div><b>Invoice:</b> <a href={data.invoiceUrl} target="_blank" rel="noreferrer" className="underline text-blue-600">Download</a></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Winner</div>
              <div className="font-medium">{data.winnerName}</div>
              <div className="text-sm text-gray-600">{data.winnerEmail}</div>
              <div className="text-sm text-gray-600">{data.winnerPhone}</div>
              <div className="text-sm text-gray-600 mt-2">{data.winnerAddress}</div>
            </div>

            <div className="flex flex-col gap-2">
              <button onClick={handleMarkPaid} className="flex items-center gap-2 justify-center px-4 py-2 bg-green-600 text-white rounded-xl">
                <CheckCircle size={16} /> Mark Paid
              </button>
              <a href={data.invoiceUrl} className="flex items-center gap-2 justify-center px-4 py-2 border rounded-xl" target="_blank" rel="noreferrer">
                <FileText size={16} /> View/Download Invoice
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
