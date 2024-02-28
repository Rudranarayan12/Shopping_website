import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'
import { useAuth } from '../../context/auth'
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    
    <Layout title={"Dashboard-E Commerece App"}>
      <div className='container mx-auto flex flex-col lg:flex-row'>
        <div className='w-full lg:w-1/5 p-4'>
          <UserMenu />
        </div>
        <div className='w-full lg:w-4/5 p-4'>
          <div className='card bg-white rounded-md p-6'>
            <h3 className='text-2xl font-bold mb-4'>User Information</h3>
            <div className='mb-4'>
              <strong className='text-gray-700'>User Name:</strong> {auth?.user?.name}
            </div>
            <div className='mb-4'>
              <strong className='text-gray-700'>User Email:</strong> {auth?.user?.email}
            </div>
            <div>
              <strong className='text-gray-700'>User Contact:</strong> {auth?.user?.phone}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard