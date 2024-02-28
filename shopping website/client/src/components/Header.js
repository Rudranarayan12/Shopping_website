import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMenuSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from '../context/auth';
import { toast } from 'react-hot-toast';
import { BiSolidUserCircle } from "react-icons/bi";
import SearchInput from './From/Searchinput';
import { useCart } from '../context/cart';
import { Badge } from "antd";

const Header = () => {
  const [cart] = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth()
  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: ""
    })
    localStorage.removeItem("auth");
    toast.success("LogOut Successfully");
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  

  return (
    <>
      <nav className="flex flex-wrap justify-between items-center p-3 bg-gray-600 text-white">
        <div className="flex items-center">

          <img
            src="/images/logo.png"
            alt="logo"
            className="w-9 h-auto"
          />
          <h1 className='text-xl'>Shopping</h1>

        </div>
        <div className="flex space-x-4 items-center">
          <SearchInput />
          <div className="hidden sm:flex space-x-4">

            <NavLink to="/" className="hover:text-gray-300">
              Home
            </NavLink>
           
            {
              !auth.user ? (<>
                <NavLink to="/login" className="hover:text-gray-300">
                  Log In
                </NavLink>
                <NavLink to="/signup" className="hover:text-gray-300">
                  Sign Up
                </NavLink>
              </>) : (<>

                <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="hover:text-gray-300">
                  Dashboard
                </NavLink>
                <NavLink onClick={handleLogout} to="/login" className="hover:text-gray-300">
                  Log Out
                </NavLink>
                <button to="" className="hover:text-gray-300">
                  <BiSolidUserCircle className='w-7 h-7' />
                </button>
              </>)
            }
            <Badge count={cart?.length} showZero>
            <NavLink to="/cart" className="hover:text-gray-300">
              🛒
            </NavLink>
            </Badge>
          </div>

          {/* Toggle icon for mobile */}
          {
            !auth.user ? (<>
              <div className="sm:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="text-white focus:outline-none"
                >
                  {isMobileMenuOpen ? <IoCloseSharp /> : <IoMenuSharp className='w-5 h-5' />}
                </button>
              </div>
            </>) : (<>
              <div className="sm:hidden">
                <button className="text-white ">
                  <BiSolidUserCircle className='w-5 h-5' />
                </button>
                <button
                  onClick={toggleMobileMenu}
                  className="text-white focus:outline-none"
                >
                  {isMobileMenuOpen ? <IoCloseSharp /> : <IoMenuSharp className='w-5 h-5' />}
                </button>

              </div>
            </>)
          }
          {/*
          <div className="sm:hidden">
            <button className="text-white ">
              <BiSolidUserCircle className='w-5 h-5' />
            </button>
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <IoCloseSharp /> : <IoMenuSharp className='w-5 h-5' />}
            </button>

          </div>
        */}

        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gray-600 p-4">
          <NavLink to="/" className="block text-white hover:text-gray-300 mb-2">
            Home
          </NavLink>
          <NavLink to="/category" className="block text-white hover:text-gray-300 mb-2">
            Category
          </NavLink>
          {
            !auth.user ? (<>
              <NavLink to="/login" className="block text-white hover:text-gray-300 mb-2">
                Log In
              </NavLink>
              <NavLink to="/signup" className="block text-white hover:text-gray-300 mb-2">
                Sign Up
              </NavLink>
            </>) : (<>

              <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="block text-white hover:text-gray-300 mb-2">
                Dashboard
              </NavLink>
              <NavLink onClick={handleLogout} to="/login" className="block text-white hover:text-gray-300 mb-2">
                Log Out
              </NavLink>

            </>)
          }
          <Badge count={cart?.length} showZero>
          <NavLink to="/cart" className="block text-white hover:text-gray-300 mb-2">
          🛒 
        </NavLink>
        </Badge>

        </div>
      )}
    </>
  );
};

export default Header;
