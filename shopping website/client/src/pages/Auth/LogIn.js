import React, { useState } from 'react';
import Layout from './../../components/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from '../../context/auth';

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, { email, password });
      if (res.data.success) {
        toast.success(res.data.message)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate(location.state || '/');
      }
      else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Something Went Worng')
    }
  }
  return (

    <Layout title={'Log In Ecommerce Website'}>
      <div className="flex flex-wrap items-center">
        <div className="w-full md:w-6/12 mb-6 md:mb-0 hidden md:block">
          <img
            src="/images/Login.png"
            alt="signup"
            className="w-[85vh] h-auto"
          />
        </div>
        <div className="w-full md:w-6/12 p-2">
          <div className="flex items-center justify-center h-screen">
            <form className="bg-gray-200 text-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 " onSubmit={handleSubmit}>
              <h4 className="text-2xl font-bold mb-4 text-blue-600">
                Log In Now
              </h4>

              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your E-mail "
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password "
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  block w-full md:inline-block"
              >
                Log In
              </button>
              <div className='mt-3'>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  block w-full md:inline-block"
                  onClick={() => {
                    navigate('/forgot-password')
                  }}
                >
                  Forgot Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LogIn;
