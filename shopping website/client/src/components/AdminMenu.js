import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <div className='text-center'>
            <h4 className='mb-4 text-xl'>Admin Panel</h4>
            <div className='lg:hidden block'>
                {/* Display this for mobile */}
                <div className='space-y-2'>
                    <NavLink to="/dashboard/admin/create-category" className="bg-blue-500 text-white p-3 rounded-md block">Create Category</NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="bg-green-500 text-white p-3 rounded-md block">Create Product</NavLink>
                    <NavLink
                        to="/dashboard/admin/products"
                        className="bg-green-500 text-white p-3 rounded-md block"
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/orders"
                        className="bg-green-500 text-white p-3 rounded-md block"
                    >
                        Orders
                    </NavLink>
                    <NavLink to="/dashboard/admin/users" className="bg-purple-500 text-white p-3 rounded-md block">Users</NavLink>
                </div>
            </div>
            <div className='hidden lg:block'>
                {/* Display this for desktop */}
                <div className='space-y-2'>
                    <NavLink to="/dashboard/admin/create-category" className="bg-blue-500 text-white p-3 rounded-md block">Create Category</NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="bg-green-500 text-white p-3 rounded-md block">Create Product</NavLink>
                    <NavLink
                        to="/dashboard/admin/products"
                        className="bg-green-500 text-white p-3 rounded-md block"
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/orders"
                        className="bg-green-500 text-white p-3 rounded-md block"
                    >
                        Orders
                    </NavLink>
                    <NavLink to="/dashboard/admin/users" className="bg-purple-500 text-white p-3 rounded-md block">Users</NavLink>
                </div>
            </div>
        </div>
    );
};

export default AdminMenu;
