import { useState, useEffect } from "react";
import {
  Gavel,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
  IndianRupee,
} from "lucide-react";
import Header from "../Components/Header";
import { useLocation } from "react-router-dom";

export default function ProductDetail() {
  const location = useLocation();
  const product = location.state?.item;

  if (!product) return <p className="text-center mt-10">No product found</p>;

  const [autoBid, setAutoBid] = useState({ maxBudget: "", minIncrement: "" });
  const [manualBid, setManualBid] = useState({ bidAmount: "" });
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBid, setCurrentBid] = useState(product.price);
  const [bidHistory, setBidHistory] = useState([]);

  // === Fetch Bid History ===
  const fetchBidHistory = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/bid/fetchAllBidsLogs/${product.id}`
      );
      const data = await res.json();
      if (res.ok) setBidHistory(data);
      else console.error("Failed to fetch bid history:", data.message);
    } catch (err) {
      console.error("Error fetching bid history:", err);
    }
  };

  useEffect(() => {
    fetchBidHistory();
  }, []);

  // === Auto-bid functions ===
  const handleAutoBidChange = (e) => {
    setAutoBid((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAutoBidSubmit = (e) => {
    e.preventDefault();
    alert(
      `Auto-bid enabled up to ₹${autoBid.maxBudget} with +₹${autoBid.minIncrement} increment.`
    );
  };

  // === Image Handling ===
  const images = [
    product.image1_url,
    product.image2_url,
    product.image3_url,
    product.image4_url,
  ].filter(Boolean);

  const displayImage = images.length ? images[currentImage] : "fallback.jpg";

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  // === Place a Bid ===
  const handlePlaceBid = async (e) => {
    e.preventDefault();

    const bidAmount = parseFloat(manualBid.bidAmount);
    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user?.id;

    if (!user_id) {
      alert("Please log in to place a bid!");
      return;
    }

    if (isNaN(bidAmount) || bidAmount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    if (bidAmount <= currentBid) {
      alert(`Your bid must be higher than the current bid ₹${currentBid}`);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/bid/placeBid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bid_id: product.id,
          user_id,
          price: bidAmount,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(
          `✅ Bid placed successfully for ₹${bidAmount.toLocaleString("en-IN")}`
        );
        setCurrentBid(bidAmount);
        setManualBid({ bidAmount: "" });
        fetchBidHistory(); // refresh bid history
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Error placing bid:", err);
      alert("Something went wrong while placing your bid.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen px-4 py-10 space-y-10">
        {/* === Product / Bid Details Card === */}
        <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden mx-auto">
          <div className="grid md:grid-cols-2">
            {/* Carousel */}
            <div className="relative bg-gray-100 flex items-center justify-center p-6">
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              <img
                src={`http://localhost:5000/photos/bidsphotos/${displayImage}`}
                alt={product.title}
                onClick={() => images.length && setIsModalOpen(true)}
                className="rounded-xl w-full h-[400px] object-cover object-top shadow-md cursor-pointer"
              />
            </div>

            {/* Info Section */}
            <div className="p-8 flex flex-col">
              <h1 className="text-3xl font-bold text-gray-800">
                {product.title}
              </h1>
              <p className="mt-2 text-gray-500 text-sm">
                This is a premium collectible item available for auction. Place
                your bid before time runs out!
              </p>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock size={18} className="olive-dark" />
                  <span>Time Left: {product.start_date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Users size={18} className="olive-dark" />
                  <span>{product.status} Bidders</span>
                </div>
                <div className="flex items-center justify-between w-full h-10">
                  <div className="text-lg font-semibold olive-dark">
                    Actual Price: ₹{product.price.toLocaleString("en-IN")}/-
                  </div>
                  <div className="text-lg font-semibold olive-dark">
                    Current Bid: ₹{currentBid.toLocaleString("en-IN")}/-
                  </div>
                </div>
              </div>

              {/* === Place Your Bid Form === */}
              <form
                onSubmit={handlePlaceBid}
                className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-4"
              >
                <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <Gavel size={18} className="olive-dark" />
                  Place Your Bid
                </h2>

                <div className="flex flex-col gap-3">
                  <input
                    type="number"
                    name="bidAmount"
                    value={manualBid.bidAmount}
                    onChange={(e) =>
                      setManualBid({ ...manualBid, bidAmount: e.target.value })
                    }
                    placeholder="Enter your bid (₹)"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bid-btn w-full flex items-center justify-center gap-2"
                >
                  Place Bid
                </button>
              </form>

              {/* Auto-Bid Section */}
              <form
                onSubmit={handleAutoBidSubmit}
                className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-4"
              >
                <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <IndianRupee size={18} className="olive-dark" />
                  Auto-Bid Settings
                </h2>

                <div className="flex flex-col gap-3">
                  <input
                    type="number"
                    name="maxBudget"
                    value={autoBid.maxBudget}
                    onChange={handleAutoBidChange}
                    placeholder="Enter max budget (₹)"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="number"
                    name="minIncrement"
                    value={autoBid.minIncrement}
                    onChange={handleAutoBidChange}
                    placeholder="Enter min increment (₹)"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bid-btn w-full flex items-center justify-center gap-2"
                >
                  Enable Auto-Bid
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* === Bid History Card === */}
        <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden mx-auto p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Bid History
          </h2>

          {bidHistory.length === 0 ? (
            <p className="text-gray-500">No bids placed yet.</p>
          ) : (
            <div className="space-y-3">
              {bidHistory.map((bid) => (
                <div
                  key={bid.id}
                  className="flex justify-between border-b border-gray-200 py-2"
                >
                  <div>
                    <span className="font-semibold">{bid.user_id}</span> bid
                  </div>
                  <div className="font-medium">
                    ₹{bid.price.toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* === Modal === */}
        {isModalOpen && images.length > 0 && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-white"
            >
              <X size={28} />
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-10 text-white bg-black/40 p-3 rounded-full"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-10 text-white bg-black/40 p-3 rounded-full"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
            <img
              src={`http://localhost:5000/photos/bidsphotos/${displayImage}`}
              alt="enlarged"
              className="max-h-[80vh] rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </>
  );
}
