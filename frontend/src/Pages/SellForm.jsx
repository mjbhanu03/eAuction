import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BidForm = () => {

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const data = new FormData();
      const user =         localStorage.getItem("user")
      data.append("title", formData.title)
      data.append("description", formData.description)
      data.append("start_date", formData.start_date)
      data.append("end_date", formData.end_date)
      data.append("category_id", formData.category_id)
      data.append("price", formData.price)
      data.append("user_id", JSON.parse(user).id)

      const imageInputs = ["imageOne", "imageTwo", "imageThree", "imageFour"]
      imageInputs.forEach((field)=>{
        const fileInput = document.querySelector(`input[name="${field}"]`)

        if(fileInput && fileInput.files[0]){
          data.append(field, fileInput.files[0])
        }
      })

    // Append multiple documents (correct field name!)
    const docInput = document.querySelector(`input[name="docs"]`);
    if (docInput && docInput.files.length > 0) {
      Array.from(docInput.files).forEach((file) => {
        data.append("document_type", file);
      });
    }
      const res = await fetch('http://localhost:5000/bid/create', {
        method: 'post',
        credentials: 'include',
        body: data
      })

      if (res.ok){
        alert('Your bid has been sent successfully!')
        navigate('/auctions')
      }
      else{
        const err = await res.json();
        console.error("Server error:", err.message)
      }
    } catch(error){
      console.log(error)
    }     
  };

  return (
    <>
      <div className="p-3 olive-dark">
        <a href="/">Back</a>
      </div>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Place a New Bid
          </h2>

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
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
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
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
              <label className="block text-gray-700 font-medium mb-1">
                Start Date
              </label>
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
              <label className="block text-gray-700 font-medium mb-1">
                End Date
              </label>
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
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="1">Car</option>
              <option value="2">Bike</option>
              <option value="3">Art</option>
              <option value="4">Jwellery</option>
              <option value="5">Electronics</option>
              <option value="6">Furniture</option>
              <option value="7">Collectibles</option>
              <option value="8">Real State</option>
              {/* Add dynamic categories here */}
            </select>
          </div>

          {/* Images */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Upload Images (up to 4)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Image 1
                </label>
                <input
                  type="file"
                  name="imageOne"
                  // accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Image 2
                </label>
                <input
                  type="file"
                  name="imageTwo"
                  // accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Image 3
                </label>
                <input
                  type="file"
                  name="imageThree"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Image 4
                </label>
                <input
                  type="file"
                  name="imageFour"
                  // accept="image/*"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="1"
              step="1"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

                    {/* Documents */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Upload Documents (all)
            </label>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Images or PDFs
                </label>
                <input
                  type="file"
                  name="docs"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"

                  multiple
                />
              </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full btn-purple bg-olive hover:olive-dark hover:bg-white text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Submit Bid
          </button>
        </form>
      </div>
    </>
  );
};

export default BidForm;