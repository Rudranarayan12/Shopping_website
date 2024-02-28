import React from 'react'
import Layout from '../components/Layout'
import { useSearch } from "../context/search";
const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <Layout title={"Serach Item"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Resuts</h1>
                    <h6>
                        {values?.results.length < 1
                            ? "No Products Found"
                            : `Found ${values?.results.length}`}
                    </h6>
                    <div className="flex flex-wrap mt-4">
                        {values?.results.map((p) => (
                            <div className="card m-2 border rounded-md overflow-hidden" style={{ width: "16rem" }}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top w-full h-48 object-cover"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-lg font-bold">{p.name}</h5>
                                    <p className="card-text text-sm">
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="card-text text-lg font-bold"> ₹ {p.price}</p>
                                    <div className="flex mt-2">
                                        <button className="bg-blue-500 text-white px-2 py-2 rounded m-1">More Details</button>
                                        <button className="bg-gray-500 text-white px-2 py-2 rounded">Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search