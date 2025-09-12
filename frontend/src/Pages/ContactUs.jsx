export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Have questions about eAuction? Reach out to us and our team will get
          back to you as soon as possible.
        </p>

        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Other Ways to Connect
          </h2>
          <p className="text-gray-600">📍 Ahmedabad, India</p>
          <p className="text-gray-600">📧 support@eauction.com</p>
          <p className="text-gray-600">📞 +91 7016 515 225</p>
        </div>
      </div>
    </div>
  );
}
