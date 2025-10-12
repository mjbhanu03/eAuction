// src/admin/Components/Topbar.jsx
import { Search, Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between bg-[#eef3fb] p-4 rounded-tl-xl rounded-tr-xl border-b border-[#e6edf7]">
      <div className="flex items-center gap-4">
        <div className="bg-white rounded-full p-2 shadow-sm">
          <Search size={18} className="text-gray-600" />
        </div>
        <div className="text-sm text-gray-600">General Report</div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-xs text-white w-4 h-4 rounded-full flex items-center justify-center">3</span>
        </button>

        <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-full shadow-sm">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <img src="https://i.pravatar.cc/150?img=24" alt="admin" />
          </div>
          <div className="text-sm">
            <div className="font-medium">Admin</div>
            <div className="text-xs text-gray-500">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}
