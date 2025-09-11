import React from "react";
// import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
// import { IoSend } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className=" px-8 py-10 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand + Socials */}
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-1">
            <span className="olive-dark">eAuction</span>
          </h1>
          <div className="flex gap-4 text-2xl mt-4">
            {/* <FaFacebookF /> */}
            {/* <FaInstagram /> */}
            {/* <FaXTwitter /> */}
          </div>
          <p className="mt-8 text-lg olive-dark">2025 Copright | eAuction</p>
          <p className="text-lg mt-2 olive-dark">
            Distributed by MJ
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold mb-4 text-xl olive-dark">Links</h3>
          <ul className="space-y-2 text-lg">
            <li>Buy & Sell</li>
            <li>Development</li>
            <li>Work</li>
            <li>Portfolio</li>
            <li>Upgrade</li>
            <li>Docs</li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="font-bold mb-4 text-xl olive-dark">Information</h3>
          <ul className="space-y-2 text-lg">
            <li>Terms</li>
            <li>Disclosures</li>
            <li>Disclosures</li>
            <li>Latest News</li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="font-bold mb-4 text-xl olive-dark">Subscribe</h3>
          <p className="text-sm mb-4">
            Subscribe to get the latest news form us
          </p>
          <div className="flex items-center border-gray-500 border-2 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-4 py-2 bg-transparent  focus:outline-none text-sm"
            />
            <button className="bg-transparent px-4 olive-dark">
              {/* <IoSend className="text-lg" /> */}Send
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
