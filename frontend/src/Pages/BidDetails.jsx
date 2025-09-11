import { useState } from "react";
import { Gavel, Clock, Users, DollarSign, ChevronLeft, ChevronRight, X, IndianRupee } from "lucide-react";
import Header from "../Components/Header";

export default function ProductDetail({ product }) {
  const [autoBid, setAutoBid] = useState({ maxBudget: "", minIncrement: "" });
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAutoBidChange = (e) => {
    setAutoBid((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAutoBidSubmit = (e) => {
    e.preventDefault();
    alert(
      `Auto-bid enabled up to ₹${autoBid.maxBudget} with +₹${autoBid.minIncrement} increment.`
    );
  };

  // Mock product with multiple images
  product = {
    id: 1,
    title: "Antique Vase",
    images: [
      "https://www.cottageartsindia.com/cdn/shop/files/3225_8ef29aa7-ee28-48b5-a61e-1839777a86cc_1800x1800.jpg?v=1730194377",
      "https://www.cottageartsindia.com/cdn/shop/files/6794_767f9197-3a6e-445d-8705-c4afeafa7e7c.jpg?v=1755779867",
      "https://www.cottageartsindia.com/cdn/shop/files/2148_1800x1800.jpg?v=1740224280",
    ],
    currentBid: "₹5,200",
    timeLeft: "2h 15m",
    bidders: 18,
    history: [
      { user: "Alice", bid: "₹5,200", time: "2 min ago" },
      { user: "Bob", bid: "₹5,000", time: "10 min ago" },
      { user: "Raj", bid: "₹4,800", time: "30 min ago" },
    ],
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  if (!product) return <p className="text-center mt-10">No product found</p>;

  return (
    <>
      <Header />
    <div className="min-h-screen px-4 py-10 space-y-10">
      {/* === Product Card === */}
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden mx-auto">
        <div className="grid md:grid-cols-2">
          {/* Carousel */}
          <div className="relative bg-gray-100 flex items-center justify-center p-6">
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            <img
              src={product.images[currentImage]}
              alt={product.title}
              onClick={() => setIsModalOpen(true)}
              className="rounded-xl w-full h-[400px] object-cover shadow-md cursor-pointer"
            />
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Info Section */}
          <div className="p-8 flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
            <p className="mt-2 text-gray-500 text-sm">
              This is a premium collectible item available for auction. Place
              your bid before time runs out!
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Clock size={18} className="olive-dark" />
                <span>Time Left: {product.timeLeft}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Users size={18} className="olive-dark" />
                <span>{product.bidders} Bidders</span>
              </div>
              <div className="flex items-center gap-2 text-lg font-semibold olive-dark">
                Current Bid: {product.currentBid}
              </div>
            </div>

            <button className="bid-btn mt-8 w-full flex items-center justify-center gap-2">
              <Gavel size={18} /> Place Your Bid
            </button>

            {/* Auto-Bid */}
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

      {/* === Fullscreen Modal Carousel === */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={28} />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-10 text-white bg-black/40 p-3 rounded-full"
          >
            <ChevronLeft size={28} />
          </button>
          <img
            src={product.images[currentImage]}
            alt="enlarged"
            className="max-h-[80vh] rounded-lg shadow-lg"
          />
          <button
            onClick={nextImage}
            className="absolute right-10 text-white bg-black/40 p-3 rounded-full"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
            {/* === Bid History === */}
      <div className="max-w-5xl mx-auto mb-8 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Bid History</h2>
        <ul className="space-y-3">
          {product.history.map((h, i) => (
            <li key={i} className="flex justify-between text-sm text-gray-700 border-b pb-2">
              <span className="font-medium">{h.user}</span>
              <span>{h.bid}</span>
              <span className="text-gray-500">{h.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}
