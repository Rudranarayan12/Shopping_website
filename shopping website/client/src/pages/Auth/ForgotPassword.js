import React, { useState } from 'react';
import Layout from './../../components/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom"


const ForgotPassword = () => {
 const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res=await axios.post(`/api/v1/auth/forget-password`,{email,newpassword,question});
      if(res.data.success){
        toast.success(res.data.message)
        navigate('/login');
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Something Went Worng')
    }
  }
    return (
        <Layout title={'Forgot Password-Ecom'}>
            <div className="flex items-center">
                
                <div className="w-full  p-2">
                    <div className="flex items-center justify-center h-screen">
                        <form className="bg-gray-200 text-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 " onSubmit={handleSubmit}>
                            <h4 className="text-2xl font-bold mb-4 text-blue-600">
                                Reset Password
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
                                    value={newpassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter Your New Password "
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="2+2=? "
                                    required
                                />
                            </div>
                          
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  block w-full md:inline-block"
                            >
                              Reset Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword