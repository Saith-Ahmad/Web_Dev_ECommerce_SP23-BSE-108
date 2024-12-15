import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AllProducts({
  products,
  search,
  setSearch,
  page,
  setPage,
  totalPages,
  setSortBy,
  setSortOrder,
}) {
    const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Sorting */}
      <div className="mb-4">
        <select
          className="p-2 border rounded"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="brand">Brand</option>
        </select>
        <select
          className="p-2 border rounded ml-2"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-gray-600 bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
              <th className="p-4 border-b text-left">Title</th>
              <th className="p-4 border-b text-left">Description</th>
              <th className="p-4 border-b text-left">Brand</th>
              <th className="p-4 border-b text-left">Price</th>
              <th className="p-4 border-b text-center">View</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <td className="p-4 border-b text-gray-800">{product.title}</td>
                <td className="p-4 border-b text-gray-600">
                  {product.description.split(" ").slice(0, 15).join(" ")}...
                </td>
                <td className="p-4 border-b text-gray-600">{product.brand}</td>
                <td className="p-4 border-b text-gray-800 font-medium">
                  ${product.price}
                </td>
                <td className="p-4 border-b text-center">
                  <ArrowRight
                    className="inline w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-600"
                    onClick={() => handleProductClick(product._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="p-2 border rounded bg-gray-800 text-white disabled:bg-gray-500"
        >
          Prev
        </button>
        <span className="p-2">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="p-2 border rounded bg-gray-800 text-white disabled:bg-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
