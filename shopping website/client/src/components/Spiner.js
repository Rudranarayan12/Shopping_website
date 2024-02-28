import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { FiCommand } from "react-icons/fi";
export default function Spiner({path="login"}) {
    const [count, setCount] = useState(5);
    const navigate = useNavigate()
    const location=useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        }, 1000)
        count === 0 && navigate(`/${path}`,{
            state:location.pathname
        })
        return () => clearInterval(interval)
    }, [count, navigate,location,path])
    return (
        <>
            <h1 className='text-center mt-16 mb-auto mx-auto'>
                Redirecting to page {count} in seconds
            </h1>


            <div className='animate'>
                <h1>Loading...</h1>
                <FiCommand className="loading-icon" />
            </div>
        </>
    );
}