import React, { useState, useEffect } from "react";
import Layout from '../components/Layout'
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const ProductDetails = () => {
    const params = useParams();
    const [cart, setCart] = useCart();
    const [product, setProduct] = useState({});
    //initalp details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);
    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout>
            <div className="flex container mt-8">
                <div className="w-1/2">
                    <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="rounded-lg"
                        alt={product.name}
                        height="300"
                        width="350px"
                    />
                </div>
                <div className="w-1/2 p-8">
                    <h1 className="text-3xl font-bold mb-4">Product Details</h1>
                    <h6 className="text-lg mb-2">Name: {product.name}</h6>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <h6 className="text-lg mb-2">Price:₹{product.price}</h6>
                    <h6 className="text-lg mb-2">Category: {product?.category?.name}</h6>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                        );
                        toast.success("Item Added to cart");
                    }}>
                        ADD TO CART
                    </button>
                </div>
            </div>
        </Layout>

    )
}

export default ProductDetails