import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function AllProducts({products}) {
    const navigate = useNavigate();
    const handleProductClick = (id) => {
        navigate(`${id}`);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>
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
        </div>
    );
}

export default AllProducts;
