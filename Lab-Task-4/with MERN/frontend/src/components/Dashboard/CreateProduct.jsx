import React, { useState } from "react";

function CreateProduct({refresh}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(null); 
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Web_Technology"); 
    formData.append("cloud_name", "ahmadwebdev"); 

    try {
      setUploading(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ahmadwebdev/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setUploading(false);
      return data.secure_url;
    } catch (error) {
      setUploading(false);
      console.error("Error uploading image:", error);
      alert("Image upload failed. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload();

    if (!imageUrl) {
      return; 
    }

    const productData = {
      title,
      description,
      price,
      brand,
      productImage: imageUrl,
    };

    try {
      const response = await fetch("http://localhost:5000/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        refresh();
      } else {
        throw new Error("Failed to create product.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product. Please try again.");
    }
  };

  return (
  <div className="flex flex-row w-full justify-center items-start">
      <div className=" p-6 shadow-lg rounded-lg ">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Brand</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={uploading}
            className={`px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg ${
              uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {uploading ? "Uploading..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default CreateProduct;
