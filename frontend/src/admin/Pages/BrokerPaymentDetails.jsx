import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BrokerPaymentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`http://localhost:5000/admin/broker-payments/${id}`);
        const json = await res.json();

        if (json.success) {
          setPayment(json.data);
        } else {
          setPayment(null);
        }
      } catch (err) {
        console.error("Error fetching detail:", err);
        setPayment(null);
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!payment) return <p className="text-center mt-10">Payment not found.</p>;

  // ================================
  // APPROVE HANDLER
  // ================================
  const handleApprove = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/admin/broker-payments/${payment.bidId}/approve`,
        { method: "POST" }
      );

      const json = await res.json();
      alert(json.message);

      // redirect user back to list page after approval
      navigate("/admin/broker-payments");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg"
      >
        ⬅ Back
      </button>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Broker Payment Details</h2>

        {/* ================= WINNER INFO =============== */}
        <h3 className="text-xl font-semibold mt-4 mb-2">🏆 Winner Details</h3>
        <p><b>Name:</b> {payment.winner?.name}</p>
        <p><b>Email:</b> {payment.winner?.email}</p>
        <p><b>Phone:</b> {payment.winner?.phone}</p>
        <p><b>City:</b> {payment.winner?.city?.name}</p>

        <hr className="my-4" />

        {/* ================= SELLER INFO =============== */}
        <h3 className="text-xl font-semibold mt-4 mb-2">👤 Seller Details</h3>
        <p><b>Name:</b> {payment.seller?.name}</p>
        <p><b>Email:</b> {payment.seller?.email}</p>
        <p><b>Phone:</b> {payment.seller?.phone}</p>
        <p><b>City:</b> {payment.seller?.city?.name}</p>

        <hr className="my-4" />

        {/* ================= PRODUCT INFO =============== */}
        <h3 className="text-xl font-semibold mt-4 mb-2">📦 Product Details</h3>
        <p><b>Product:</b> {payment.bidTitle}</p>
        <p><b>Final Price:</b> ₹{Number(payment.finalPrice).toLocaleString()}</p>
        <p><b>Commission Rate:</b> {payment.commissionRate}%</p>
        <p><b>Commission Amount:</b> ₹{Number(payment.commissionAmount).toLocaleString()}</p>

        <button
          onClick={handleApprove}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-xl shadow"
        >
          ✅ Approve Payment
        </button>
      </div>
    </motion.div>
  );
}
