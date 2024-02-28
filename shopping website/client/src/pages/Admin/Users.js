import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'

const Users = () => {
    return (
        <Layout title={"User in E-comm"}>
            <div className='container mx-auto flex'>
                <div className='w-1/5 p-4'>
                    <AdminMenu />
                </div>
                <div className='w-4/5 p-4'>
                    <h1 className='text-2xl font-bold mb-4'>All User</h1>
                </div>
            </div>
        </Layout>
    )
}

export default Users