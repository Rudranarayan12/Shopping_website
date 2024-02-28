import React from 'react'
import { NavLink } from 'react-router-dom';
const UserMenu = () => {
  return (
    <>
    <div className='text-center'>
        <h4 className='mb-4 text-xl'>Dashboard</h4>
        <div className='space-y-2'>
            
            <NavLink to="/dashboard/user/orders" className="bg-green-500 text-white p-3 rounded-md block">Total Order</NavLink>
           
        </div>
    </div>
</>
  )
}

export default UserMenu