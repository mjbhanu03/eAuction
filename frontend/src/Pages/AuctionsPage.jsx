import { useState } from "react";
import { Menu, Search, Filter, SortAsc, Gavel, Clock } from "lucide-react";
import Header from "../Components/Header";

export default function AuctionListing() {
  // const [menuOpen, setMenuOpen] = useState(false);

  const auctions = [
    { id: 1, title: "Antique Vase", image: "https://www.cottageartsindia.com/cdn/shop/files/2148_1800x1800.jpg?v=1740224280", currentBid: "₹5,200", timeLeft: "2h 15m", bidders: 18 },
    { id: 2, title: "Luxury Watch", image: "https://timeandtidewatches.com/wp-content/uploads/2023/11/Mathey-Tissot-Vintage-Custom-Elvis-Watch.jpg.webp", currentBid: "₹12,800", timeLeft: "5h 40m", bidders: 32 },
    { id: 3, title: "Vintage Car Model", image: "https://i.pinimg.com/564x/04/7d/72/047d723662060b56ea821c905cd42189.jpg", currentBid: "₹22,000", timeLeft: "1h 05m", bidders: 12 },
    { id: 4, title: "Rare Painting", image: "https://www.soosi.co.in/cdn/shop/products/IMG-20190415-WA0018_300x300.jpg?v=1571711114", currentBid: "₹40,000", timeLeft: "12h 30m", bidders: 21 },
    { id: 5, title: "Diamond Ring", image: "https://images-cdn.ubuy.co.in/65264c5e66567725b96c7809-women-s-double-layer-micro-inlaid-zircon.jpg", currentBid: "₹75,000", timeLeft: "8h 20m", bidders: 14 },
    { id: 6, title: "Classic Guitar", image: "https://www.bamboomusica.com/wp-content/uploads/2022/02/Portada_Guitarra-Clasica-Natural.png", currentBid: "₹15,600", timeLeft: "3h 50m", bidders: 9 },
  ];

  return (
    <div className="min-h-screen">
      {/* Top Navbar */}
      <Header />

        {/* Search */}
        <div className="flex items-center w-1/2 max-w-md">
          <input
            type="text"
            placeholder="Search items..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:#056973"
          />
          <button className="navbar text-white px-4 py-2 rounded-r-lg ">
            <Search size={18} />
          </button>
        </div>

        {/* Right Buttons */}
        <div className="hidden lg:flex gap-3">
          <button className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200">
            <Filter size={18} /> Filters
          </button>
          <button className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200">
            <SortAsc size={18} /> Sort
          </button>
        </div>
      

      {/* Sidebar for Mobile */}
      {/* {menuOpen && (
        <aside className="lg:hidden absolute top-0 left-0 w-64 h-full bg-white shadow-md z-20 p-5">
          <h2 className="font-semibold text-lg mb-4">Menu</h2>
          <ul className="space-y-3 text-gray-700">
            <li>🏠 Home</li>
            <li>⭐ My Bids</li>
            <li>💰 Transactions</li>
            <li>⚙ Settings</li>
          </ul>
        </aside>
      )} */}

      {/* Main Auction Grid */}
      <main className="p-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-px bg-gray-200">
        {auctions.map((item) => (
<div
  key={item.id}
  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-transform transform hover:-translate-y-1 duration-300 flex flex-col overflow-hidden"
>
  {/* Image with subtle zoom */}
  <div className="overflow-hidden">
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-44 object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
    />
  </div>

  <div className="p-4 flex flex-col flex-grow">
    <h2 className="text-base font-semibold text-gray-800 mb-1 line-clamp-1">
      {item.title}
    </h2>

    <div className="flex justify-between items-center mt-1 text-sm text-gray-600">
      <span className="flex items-center gap-1">
        <Clock size={14} /> {item.timeLeft}
      </span>
      <span className="font-bold olive-dark text-lg">{item.currentBid}</span>
    </div>

    <p className="text-gray-500 text-xs mt-1">{item.bidders} bidders</p>


                <a href="/biddetails" className="bid-btn mt-auto w-full flex items-center justify-center gap-1"> Place Your Bid </a>

  </div>
</div>

        ))}
      </main>
    </div>
  );
}
