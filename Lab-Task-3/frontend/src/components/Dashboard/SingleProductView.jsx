import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SingleProductView() {
  const { id } = useParams(); // Extract product ID from the route
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const placeholderImage = "https://via.placeholder.com/300x300?text=No+Image";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the product.");
      }

      alert("Product deleted successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={product.productImage || placeholderImage}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-medium text-gray-800 mb-2">Brand: {product.brand}</p>
          <p className="text-lg font-medium text-gray-800">Price: ${product.price}</p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductView;
