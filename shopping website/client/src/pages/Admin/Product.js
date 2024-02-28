import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Product = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container mx-auto flex flex-wrap">
      <div className="w-full sm:w-1/5 p-4">
        <AdminMenu />
      </div>
        <div className="w-full sm:w-4/5 p-4 ">
          <h1 className="text-center text-xl">All Products List</h1>
          <div className="d-flex flex flex-wrap justify-between items-center p-3">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link flex space-x-4 items-center"
              >
                <div className="card m-2 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4" style={{ maxWidth: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top w-full h-auto lg:w-72 xl:w-80 "
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-2xl">{p.name}</h5>
                    <p className="card-text text-gray-400">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;