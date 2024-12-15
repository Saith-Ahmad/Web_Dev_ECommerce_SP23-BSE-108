
import React, { useEffect, useState } from "react";
import AllProducts from "../components/Dashboard/AllProducts";
import CreateProduct from "../components/Dashboard/CreateProduct";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalPages, setTotalPages] = useState(1); 


  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/products?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );
      const data = await response.json();
      setProducts(data.products); 
      setTotalPages(data.totalPages); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit, search, sortBy, sortOrder]);

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col md:flex-row gap-3 p-5">
      <div className="w-full">
        <AllProducts
          products={products}
          search={search}
          setSearch={setSearch}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
        />
      </div>
      <div className="w-full">
        <CreateProduct refresh={fetchProducts} />
      </div>
    </div>
  );
}

export default Dashboard;
