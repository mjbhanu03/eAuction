import { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Calendar,
  IndianRupee,
} from "lucide-react";

export default function RequestedBids() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [message, setMessage] = useState("");

  // Fetch requested bids from backend
  useEffect(() => {
    const fetchRequestedBids = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin/requested-bids", {
          withCredentials: true,
        });
        setBids(res.data.data || []);
      } catch (error) {
        console.error("Error fetching requested bids:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestedBids();
  }, []);

  // ✅ Approve bid and update DB
  const approveBid = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/admin/approve-bid/${id}`, {}, {
        withCredentials: true,
      });

      if (res.data.success) {
        setMessage("✅ Bid approved successfully!");
        setTimeout(() => setMessage(""), 3000);
        setBids((prev) =>
          prev.filter((bid) => bid.id !== id) // remove from list
        );
      }
    } catch (error) {
      console.error("Error approving bid:", error);
      setMessage("❌ Failed to approve bid");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // ❌ Reject bid
  const rejectBid = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/admin/reject-bid/${id}`, {}, {
        withCredentials: true,
      });

      if (res.data.success) {
        setMessage("⚠️ Bid rejected successfully");
        setTimeout(() => setMessage(""), 3000);
        setBids((prev) =>
          prev.filter((bid) => bid.id !== id)
        );
      }
    } catch (error) {
      console.error("Error rejecting bid:", error);
      setMessage("❌ Failed to reject bid");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // handle image carousel
  const handleNextImage = (bidId, images) => {
    setCurrentImageIndex((prev) => {
      const current = prev[bidId] || 0;
      const next = (current + 1) % images.length;
      return { ...prev, [bidId]: next };
    });
  };

  const handlePrevImage = (bidId, images) => {
    setCurrentImageIndex((prev) => {
      const current = prev[bidId] || 0;
      const next = (current - 1 + images.length) % images.length;
      return { ...prev, [bidId]: next };
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg text-gray-600">
        Loading requested bids...
      </div>
    );
  }

  return (
    <div className="p-6 relative">
      {/* Success/Failure Message */}
      {message && (
  <div className="fixed top-4 right-4 bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-4 rounded-xl shadow-2xl font-semibold animate-bounce text-base min-w-[320px] text-center">
          {message}
        </div>
      )}

      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-6 text-[#0b3d91]">Requested Bids</h1>
      <p className="text-gray-600 mb-8">
        Review seller-submitted items before approving them for auction.
      </p>

      {/* Bids List */}
      {bids.length === 0 ? (
        <p className="text-gray-500 text-center">No requested bids found.</p>
      ) : (
        <div className="grid gap-6">
          {bids.map((bid) => {
            const images = [
              bid.image1_url,
              bid.image2_url,
              bid.image3_url,
              bid.image4_url,
            ].filter(Boolean);

            const currentIndex = currentImageIndex[bid.id] || 0;
            const currentImage = images[currentIndex];

            return (
              <div
                key={bid.id}
                className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center hover:shadow-xl transition"
              >
                {/* Image Carousel */}
                <div className="relative w-40 h-40 flex items-center justify-center border rounded-lg overflow-hidden">
                  {currentImage ? (
                    <img
                      src={`http://localhost:5000/photos/${currentImage}`}
                      alt={`${bid.title} - ${currentIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-gray-400 text-sm">No image</p>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => handlePrevImage(bid.id, images)}
                        className="absolute left-1 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <button
                        onClick={() => handleNextImage(bid.id, images)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 px-6">
                  <h2 className="text-lg font-semibold text-gray-800">{bid.title}</h2>
                  <p className="text-sm text-gray-600">
                    Seller:{" "}
                    <span className="font-medium">{bid.user?.name || "Unknown"}</span>
                  </p>

                  <p className="text-sm text-gray-600">
                  Category:{" "}
                  <span className="font-medium text-blue-700">
                    {bid.category?.name || "Uncategorized"}
                  </span>
                </p>

                  <p className="text-sm text-gray-600">
                    Proof:{" "}
                    <a
                      href={`http://localhost:5000/photos/${bid.image1_url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      View Document
                    </a>
                  </p>
                </div>

                {/* Price + Dates */}
                <div className="flex flex-col gap-2 text-sm text-gray-700 border-l pl-6 min-w-[180px]">
                  <div className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-green-700" />
                    <span className="font-semibold">
                      ₹{bid.price?.toLocaleString() || "—"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-700" />
                    <span>
                      <b>Start:</b>{" "}
                      {bid.start_date
                        ? new Date(bid.start_date).toLocaleDateString("en-GB")
                        : "—"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-red-700" />
                    <span>
                      <b>End:</b>{" "}
                      {bid.end_date
                        ? new Date(bid.end_date).toLocaleDateString("en-GB")
                        : "—"}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => approveBid(bid.id)}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    <CheckCircle size={18} /> Approve
                  </button>
                  <button
                    onClick={() => rejectBid(bid.id)}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
