import React from 'react'
import Logo from '../Icons/LOGO.png'
import Login from './Login'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";


const Home = () => {
  return (
    <div className="custom-bg">

      <div className="md:flex md:justify-between w-full p-6 md:p-12 items-center">
        <div>
          <img src={Logo} alt="Logo" className="w-[30px] h-[30px] md:w-48" />
        </div>

        <div className="md:flex gap-4 md:gap-8">
            <Link className="text-white border rounded-full py-2 px-6 md:py-1 md:px-8 hover:text-black hover:bg-white font-[400] text-[24px] hover:border-transparent" to='/login'>Log in</Link>
            <Link className="text-black bg-[#BCBCBC] hover:bg-white border-none rounded-full py-2 px-6 md:py-1 md:px-8 font-[400] text-[24px]" to='/signup'>Create an Account</Link>
        </div>
      </div>

      <div className="w-full pt-24 flex flex-col gap-8 md:gap-12 md:pl-16 px-6">
        <div>
          <p className="text-white text-3xl md:text-5xl leading-tight md:w-3/4 font-[600]">
            Unlock the Power <br /> of Thrift and Achieve <br /> Your Financial Goals.
          </p>
        </div>

        <div>
          <button className="bg-gray-500 text-white border border-white rounded-full py-3 px-8 hover:border-none flex items-center gap-3">
            Create a thrift
            <span><FaArrowRightLong /></span>
          </button>
        </div>
      </div>

    </div>
  )
}
export default Home