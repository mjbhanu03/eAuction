import { useState } from "react";
import Header from "../Components/Header";

const BidForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    category_id: "",
    price: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(files).slice(0, 4), // limit to 4
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting bid:", formData);
    // TODO: Add API call
  };

  return (
    <>
    
      <Header />
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Place a New Bid
        </h2>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        {/* Dates */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="1">Electronics</option>
            <option value="2">Collectibles</option>
            <option value="3">Art</option>
            {/* Add dynamic categories here */}
          </select>
        </div>

        {/* Images */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Upload Images (up to 4)</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="1"
            step="0.01"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full olive hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Submit Bid
        </button>
      </form>
    </div>
    </>
  );
};


export default BidForm