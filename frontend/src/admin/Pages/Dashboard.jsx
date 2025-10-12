// src/admin/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { motion } from "framer-motion";
import { Gavel, Users, Clock, Tag, TrendingUp, Gift, Search } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

export default function Dashboard() {
  // --- E-Auction specific stats ---
  const stats = [
    { title: "Live Auctions", value: "18", badge: "+5%", icon: <Gavel size={26} />, color: "from-indigo-500 to-indigo-700" },
    { title: "Active Bidders", value: "1,204", badge: "+8%", icon: <Users size={26} />, color: "from-emerald-500 to-emerald-700" },
    { title: "Total Listings", value: "3,412", badge: "+2%", icon: <Tag size={26} />, color: "from-yellow-500 to-yellow-700" },
    { title: "Completed Sales", value: "1,028", badge: "+12%", icon: <Gavel size={26} />, color: "from-pink-500 to-pink-700" }
  ];

  // --- Auctions over time (line) ---
  const lineData = {
    labels: ["Sep 1","Sep 8","Sep 15","Sep 22","Sep 29","Oct 6","Oct 13"],
    datasets: [
      {
        label: "Bids per day",
        data: [120, 200, 150, 300, 250, 420, 380],
        fill: true,
        backgroundColor: "rgba(99,102,241,0.08)",
        borderColor: "#6366f1",
        tension: 0.35,
        borderWidth: 3,
        pointRadius: 3
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
    interaction: { mode: 'nearest', axis: 'x', intersect: false },
    scales: { x: { grid: { display: false } }, y: { ticks: { beginAtZero: true } } }
  };

  // --- Top auctions (bar) ---
  const barData = {
    labels: ["Antique Vase","Luxury Watch","Painting","Classic Car","Rare Coin"],
    datasets: [{ label: "Total Bids", data: [45, 38, 32, 27, 18], backgroundColor: "rgba(16,185,129,0.9)" }]
  };

  // --- Sample data lists ---
  const liveAuctions = [
    { id: "A-1001", title: "Antique Brass Lamp", current: "₹12,400", timeLeftSec: 7200, bids: 24 },
    { id: "A-1002", title: "Signed Cricket Bat", current: "₹9,800", timeLeftSec: 3600, bids: 18 },
    { id: "A-1003", title: "Vintage Radio", current: "₹5,600", timeLeftSec: 5400, bids: 9 }
  ];

  const recentWinners = [
    { auction: "A-0909", winner: "Priya K.", amount: "₹42,000" },
    { auction: "A-0912", winner: "Suresh M.", amount: "₹8,750" }
  ];

  // --- Countdown helper (client-side state) ---
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (sec) => {
    const h = Math.floor(sec/3600); const m = Math.floor((sec%3600)/60); const s = sec%60;
    return `${h}h ${m}m ${s}s`;
  };

  // --- Search/filter state (UI only) ---
  const [query, setQuery] = useState("");
  const filteredAuctions = liveAuctions.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.id.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">E‑Auction Admin</h1>
          <p className="text-sm text-gray-500">Monitor live auctions, bidders and recent activity</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white rounded-md border px-3 py-1 gap-2">
            <Search size={16} className="text-gray-400" />
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search auctions or id" className="text-sm outline-none" />
          </div>
          <button className="px-3 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-md text-sm">Create Auction</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s,i)=>(
          <motion.div whileHover={{ scale: 1.03 }} key={i} className={`rounded-xl p-4 text-white bg-gradient-to-r ${s.color} shadow-lg relative overflow-hidden`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs opacity-90">{s.title}</div>
                <div className="text-2xl font-bold mt-1">{s.value}</div>
                <div className="mt-2 text-xs bg-white/20 px-2 py-0.5 rounded-full inline-block">{s.badge}</div>
              </div>
              <div className="opacity-90">{s.icon}</div>
            </div>
            <div className="absolute right-2 bottom-2 text-xs opacity-10 select-none">E‑A</div>
          </motion.div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Live auctions list */}
        <motion.div whileHover={{ y: -3 }} className="bg-white rounded-xl p-4 shadow col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-500">Live Auctions</div>
              <div className="text-lg font-semibold">Active Listings</div>
            </div>
            <div className="text-sm text-gray-500">Updated just now</div>
          </div>

          <div className="space-y-3">
            {filteredAuctions.map((a,idx)=> (
              <div key={a.id} className="flex items-center justify-between border rounded-lg p-3 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-md flex items-center justify-center text-indigo-700 font-semibold">{a.id.split('-')[1]}</div>
                  <div>
                    <div className="font-medium">{a.title}</div>
                    <div className="text-sm text-gray-500">{a.bids} bids • Current {a.current}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">{formatTime(Math.max(0, Math.floor((a.timeLeftSec - Math.floor((Date.now()-now)/1000)))) )}</div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-md">View</button>
                    <button className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded-md">End</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <button className="px-4 py-2 bg-white border rounded-md text-sm">View all auctions</button>
          </div>
        </motion.div>

        {/* Right column: charts + recent winners */}
        <div className="space-y-6">
          <motion.div whileHover={{ y: -3 }} className="bg-white rounded-xl p-4 shadow">
            <div className="mb-3">
              <div className="text-sm text-gray-500">Activity</div>
              <div className="text-lg font-semibold">Bids Over Time</div>
            </div>
            <div className="h-36">
              <Line data={lineData} options={lineOptions} />
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} className="bg-white rounded-xl p-4 shadow">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Top Auctions</div>
                <div className="text-lg font-semibold">Most Competitive</div>
              </div>
              <div className="text-sm text-gray-400">This Week</div>
            </div>
            <div className="h-32">
              <Bar data={barData} options={{ plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true } } }} />
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} className="bg-white rounded-xl p-4 shadow">
            <div className="text-sm text-gray-500">Recent Winners</div>
            <div className="mt-3 space-y-2">
              {recentWinners.map((r,idx)=> (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{r.auction}</div>
                    <div className="text-xs text-gray-500">{r.winner}</div>
                  </div>
                  <div className="font-semibold">{r.amount}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom: quick actions and footer */}
      <div className="bg-white rounded-xl p-4 shadow flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white rounded-md">Start Auction</button>
          <button className="px-3 py-2 bg-gray-100 rounded-md">Manage Listings</button>
          <button className="px-3 py-2 bg-gray-100 rounded-md">Manage Bidders</button>
        </div>
        <div className="text-sm text-gray-500">© {new Date().getFullYear()} E‑Auction • Version 2.0</div>
      </div>
    </div>
  );
}
