import React from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
    const [auth] = useAuth();

    return (
        <Layout title={"Admin Dashboard"}>
            <div className='container mx-auto flex flex-col lg:flex-row'>
                <div className='w-full lg:w-1/5 p-4'>
                    <AdminMenu />
                </div>
                <div className='w-full lg:w-4/5 p-4'>
                    <div className='card bg-white rounded-md p-6'>
                        <h3 className='text-2xl font-bold mb-4'>Admin Information</h3>
                        <div className='mb-4'>
                            <strong className='text-gray-700'>Admin Name:</strong> {auth?.user?.name}
                        </div>
                        <div className='mb-4'>
                            <strong className='text-gray-700'>Admin Email:</strong> {auth?.user?.email}
                        </div>
                        <div>
                            <strong className='text-gray-700'>Admin Contact:</strong> {auth?.user?.phone}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
