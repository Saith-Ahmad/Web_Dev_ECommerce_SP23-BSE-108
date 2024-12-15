import React, { useEffect, useState } from 'react'
import AllProducts from '../components/Dashboard/AllProducts'
import CreateProduct from '../components/Dashboard/CreateProduct'

function Dashboard() {
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/products");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <div className='bg-gray-200 min-h-screen flex flex-col md:flex-row gap-3 p-5'>

            
            <div className='w-full'><AllProducts products={products}/></div>
            <div className='w-full'><CreateProduct refresh={fetchProducts}/></div>
        </div>
    )
}

export default Dashboard