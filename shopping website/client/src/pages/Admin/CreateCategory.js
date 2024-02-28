import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from '../../components/From/CategoryFrom';
import { Modal } from 'antd'
const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    //handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/category/create-category", {
                name,
            });
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("somthing went wrong in input form");
        }
    };

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };
    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `/api/v1/category/delete-category/${pId}`
            );
            if (data.success) {
                toast.success(`category is deleted`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };

    return (
        <Layout title={'Categories in E-comm'}>
            <div className='container mx-auto flex flex-wrap'>
                <div className='w-full sm:w-1/4 p-4'>
                    <AdminMenu />
                </div>
                <div className='w-full sm:w-3/4 p-4'>
                    <h1 className='text-2xl sm:text-3xl font-bold mb-4'>Manage All Category</h1>
                    <div className='p-3 w-1/2'>
                        <CategoryForm
                            handleSubmit={handleSubmit}
                            value={name}
                            setValue={setName}
                        />
                    </div>
                    <div className='w-3/4 mt-6'>
                        <table className='w-full mt-6 overflow-x-auto'>
                            <thead>
                                <tr>
                                    <th className='text-left'>Name</th>
                                    <th className='text-left'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories?.map((c) => (
                                    <tr key={c._id}>
                                        <td className='py-2'>{c.name}</td>
                                        <td className='flex space-x-2 mb-2'>
                                            <button
                                                className='bg-blue-500 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:shadow-outline-blue active:scale-90 sm:px-6 sm:py-3'
                                                onClick={() => {
                                                    setVisible(true);
                                                    setUpdatedName(c.name);
                                                    setSelected(c);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className='bg-red-500 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:shadow-outline-red active:scale-90'
                                                onClick={() => {
                                                    handleDelete(c._id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Modal onCancel={() => setVisible(false)} footer={null} visible={visible} className='w-full sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3'>
                        <CategoryForm
                            value={updatedName}
                            setValue={setUpdatedName}
                            handleSubmit={handleUpdate}
                        />
                    </Modal>
                </div>
            </div>
        </Layout>

    )
}

export default CreateCategory