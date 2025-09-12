export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12">
      {/* Header */}
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-4">
        About eAuction
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
        eAuction is a modern online auction platform that enables buyers and
        sellers to connect seamlessly. Our platform provides a secure, scalable,
        and transparent way to bid, win, and sell products in real-time.
      </p>

      {/* Mission & Vision */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">🎯 Our Mission</h2>
          <p>
            To create a trusted and user-friendly online auction system where
            individuals and businesses can participate in fair, competitive, and
            transparent bidding experiences anytime, anywhere.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">🌍 Our Vision</h2>
          <p>
            To become the most reliable and scalable e-auction platform that
            transforms traditional bidding into a seamless digital experience
            accessible for everyone.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-blue-500 mb-6 text-center">
          🚀 Key Features
        </h2>
        <ul className="grid md:grid-cols-2 gap-4 text-lg">
          <li className="p-4 bg-gray-50 rounded-lg shadow-sm">
            ✅ Real-time bidding system
          </li>
          <li className="p-4 bg-gray-50 rounded-lg shadow-sm">
            ✅ Secure user authentication
          </li>
          <li className="p-4 bg-gray-50 rounded-lg shadow-sm">
            ✅ Role-based access for buyers & sellers
          </li>
          <li className="p-4 bg-gray-50 rounded-lg shadow-sm">
            ✅ Auto-bidding with max budget setup
          </li>
          <li className="p-4 bg-gray-50 rounded-lg shadow-sm">
            ✅ Notifications & bid history tracking
          </li>
          <li className="p-4 bg-gray-50 rounded-lg shadow-sm">
            ✅ Scalable architecture for large auctions
          </li>
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-blue-500 mb-6 text-center">
          🛠️ Technology Stack
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="font-semibold">Frontend</h3>
            <p>React, Tailwind CSS</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="font-semibold">Backend</h3>
            <p>Node.js, Express.js</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="font-semibold">Database</h3>
            <p>MongoDB / MySQL</p>
          </div>
        </div>
      </div>

      {/* Future Enhancements */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-blue-500 mb-6 text-center">
          🔮 Future Enhancements
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-lg">
          <li>Integration of AI-powered price prediction</li>
          <li>Blockchain-based secure transaction verification</li>
          <li>Mobile app support for Android & iOS</li>
          <li>Advanced analytics dashboards for sellers</li>
        </ul>
      </div>

      {/* Footer */}
      <p className="mt-12 text-gray-500 italic text-center text-sm">
        ✨ "Bid smart. Buy secure. Sell faster with eAuction." ✨
      </p>
    </div>
  );
}
