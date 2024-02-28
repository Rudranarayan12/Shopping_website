import React, { useState, useEffect } from "react";
import Layout from '../components/Layout'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from '../components/Price';
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const HomePage = () => {
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTOtal COunt
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"Best Deal Shop Now"}>
            <div className="container mx-auto flex flex-col md:flex-row">
                <div className="w-full md:w-1/5 p-4 bg-gray-200">
                    <h4 className="text-center text-lg font-bold mb-4">Filter By Category</h4>
                    <div className="flex flex-col">
                        {categories?.map((c) => (
                            <Checkbox
                                key={c._id}
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                                className="m-2"
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    <h4 className="text-center mt-4 text-lg font-bold">Filter By Price</h4>
                    <div className="flex flex-col">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)} className="m-2">
                            {Prices?.map((p) => (
                                <div key={p._id} className="m-2">
                                    <Radio className="mr-2" value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="flex flex-col mt-4">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-4/5 p-4">
                    <h1 className="text-center text-2xl font-bold mb-4">All Products</h1>
                    <div className="flex flex-wrap">
                        {products?.map((p) => (
                            <div className="card m-2 border rounded-md overflow-hidden" style={{ width: "100%", maxWidth: "16rem" }}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top w-full h-48 object-contain"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-lg font-bold">{p.name}</h5>
                                    <p className="card-text text-sm">
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="card-text text-lg font-bold"> ₹ {p.price}</p>
                                    <div className="flex mt-2">
                                        <button className="bg-blue-500 text-white px-2 py-2 rounded m-1"
                                            onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                        <button className="bg-gray-500 text-white px-2 py-2 rounded"
                                            onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem(
                                                    "cart",
                                                    JSON.stringify([...cart, p])
                                                );
                                                toast.success("Item Added to cart");
                                            }}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading ..." : "Load More"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage