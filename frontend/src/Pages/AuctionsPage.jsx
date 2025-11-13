import { useEffect, useState } from "react";
import { Menu, Search, Filter, SortAsc, Gavel, Clock } from "lucide-react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

export default function AuctionListing() {
  // const [menuOpen, setMenuOpen] = useState(false);
  const [auctions, setAuctions] = useState([]);

  // const auctions = [];

useEffect(()=>{
  fetch("http://localhost:5000/bid/")
  .then((res)=>res.json())
  .then((data)=> {
    setAuctions(data)
    console.log(data)
  })
}, [])

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
      src= {`http://localhost:5000/photos/bidsphotos/${item.image1_url}`}
      // {item.image1_url}
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
        <Clock size={14} /> 
        {
  (() => {
    const now = new Date();
    const end = new Date(item.start_date);
    const diffMs = end - now;

    if (diffMs <= 0) {
      return "Active";
    }

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffDays}d ${diffHours}h ${diffMinutes}m left to start this`;
  })()
}
      </span>
      <span className="font-bold olive-dark text-lg">{item.currentBid}</span>
    </div>

    <p className="text-gray-500 text-xs mt-1">{item.status} bid</p>


                <Link to="/biddetails" state={{item}} className="bid-btn mt-auto w-full flex items-center justify-center gap-1"> Place Your Bid </Link>

  </div>
</div>

        ))}
      </main>
    </div>
  );
}
