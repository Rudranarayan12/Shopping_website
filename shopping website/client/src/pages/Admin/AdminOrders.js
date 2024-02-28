import React, { useState, useEffect } from "react";
import Layout from '../../components/Layout'
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from '../../components/AdminMenu';
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-4">
          <AdminMenu />
        </div>
        <div className="w-full md:w-3/4 p-4">
          <h1 className="text-center text-4xl mb-8">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow mb-8 p-4">
                <div className="table-responsive">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Buyer</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Payment</th>
                        <th className="border px-4 py-2">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((o, i) => (
                        <tr key={o._id}>
                          <td className="border px-4 py-2">{i + 1}</td>
                          <td className="border px-4 py-2">
                            <Select
                              className="border rounded p-2"
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td className="border px-4 py-2">{o?.buyer?.name}</td>
                          <td className="border px-4 py-2">{moment(o?.createAt).fromNow()}</td>
                          <td className="border px-4 py-2">{o?.payment.success ? "Success" : "Failed"}</td>
                          <td className="border px-4 py-2">{o?.products?.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {o?.products?.map((p, i) => (
                    <div className="p-4 border shadow" key={p._id}>
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="w-full h-32 object-cover mb-4"
                        alt={p.name}
                      />
                      <p className="text-lg font-bold">{p.name}</p>
                      <p className="text-sm">{p.description.substring(0, 30)}</p>
                      <p className="text-sm">Price:₹ {p.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>

  )
}

export default AdminOrders