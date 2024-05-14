import React from 'react'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <div>
    
      <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          ABCBlogs
        </div>
        <div className="hidden md:flex space-x-4">
        <Link to='/'>
          <a href="#" className="hover:text-gray-300">Home</a>
       </Link>
          <Link to='/addblogs'>
          <a href="#" className="hover:text-gray-300">Add Blogs</a>
          </Link>
          <Link to="/allblog">

          <a href="#" className="hover:text-gray-300">All Blogs</a>
          
          </Link>
          
        </div>
        <div className="space-x-2">
          <Link to='/login' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </Link>
         <Link  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" to='/register'>
         
            Register
          
          </Link>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Nav
