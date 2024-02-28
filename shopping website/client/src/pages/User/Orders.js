import React, { useState, useEffect } from "react";
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    return (
        <Layout title={"Order Section"}>
            <div className='container mx-auto flex flex-wrap'>
                <div className='w-full md:w-1/5 p-4'>
                    <UserMenu />
                </div>
                <div className='w-full md:w-4/5 p-4'>
                    <h1>All Orders</h1>
                    {orders?.map((o, i) => (
                        <div className="border shadow p-4 mb-4 table-responsive" key={i}>
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th className="border p-2">#</th>
                                        <th className="border p-2">Status</th>
                                        <th className="border p-2">Buyer</th>
                                        <th className="border p-2">Date</th>
                                        <th className="border p-2">Payment</th>
                                        <th className="border p-2">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border p-2">{i + 1}</td>
                                        <td className="border p-2">{o?.status}</td>
                                        <td className="border p-2">{o?.buyer?.name}</td>
                                        <td className="border p-2">{moment(o?.createAt).fromNow()}</td>
                                        <td className="border p-2">{o?.payment.success ? "Success" : "Failed"}</td>
                                        <td className="border p-2">{o?.products?.length}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {o?.products?.map((p, j) => (
                                    <div className="p-4 bg-white rounded-md shadow-md" key={p._id}>
                                        <img
                                            src={`/api/v1/product/product-photo/${p._id}`}
                                            className="w-full h-32 object-cover mb-2"
                                            alt={p.name}
                                        />
                                        <p className="text-lg font-semibold">{p.name}</p>
                                        <p className="text-gray-600 mb-2">{p.description.substring(0, 30)}</p>
                                        <p className="text-gray-800 ">Price:₹ {p.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </Layout>
    )
}

export default Orders