import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [fullname, setFullName] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newGroup = {
            username,
            password,
            email,
            fullname
        };

        try {
            await axios.post('http://localhost:5000/users', newGroup);
            toast.success("Account Created Successfully")
            setUsername("")
            setPassword("")
            setEmail("")
            setFullName("")
            setTimeout(() => {
                navigate("/login")
            }, 4000);
        } catch (error) {
            console.error('Signup error', error);
            toast.error("Error creating account")
        }
    }



    return (
        <div className='h-screen flex custom-bg'>
            <form onSubmit={handleSubmit} className='w-[718px] m-auto bg-white rounded-[30px]'>
                <div className=' m-auto bg-white flex flex-col gap-[22px] rounded-[30px] p-5'>
                    <div className='w-[690px] m-auto space-y-[20px] px-[64px]'>
                        <div>
                            <h2 className='text-[38px] font-[600] text-center'>Create account</h2>
                            <div className=''>
                                <div>
                                    <p className='text-[#00000080] text-[24px] font-[400]'>Full Name</p>
                                    <input
                                        name='username'
                                        value={fullname}
                                        className='mt-[22px] border w-full bg-[#6672EA33] pt-[10px] pb-[10px] pr-[32px] pl-[32px] rounded-[30px] focus:outline-none'
                                        type="text"
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <p className='text-[#00000080] text-[24px] font-[400]'>Username</p>
                                    <input
                                        name='username'
                                        value={username}
                                        className='mt-[22px] border w-full bg-[#6672EA33] pt-[10px] pb-[10px] pr-[32px] pl-[32px] rounded-[30px] focus:outline-none'
                                        type="text"
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <p className='text-[#00000080] text-[24px] font-[400]'>Email</p>
                                    <input
                                        name='email'
                                        value={email}
                                        className='mt-[22px] border w-full bg-[#6672EA33] pt-[10px] pb-[10px] pr-[32px] pl-[32px] rounded-[30px] focus:outline-none'
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <p className='text-[#00000080] text-[24px] font-[400]'>Password</p>
                                    <div className="relative mt-[22px]">
                                        <input
                                            name="password"
                                            value={password}
                                            type={showPassword ? "text" : "password"}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="w-full bg-[#6672EA33] border pt-[10px] pb-[10px] pr-[50px] pl-[32px] rounded-[30px] focus:outline-none"
                                        />
                                        <span
                                            onClick={() => setShowPassword(prev => !prev)}
                                            className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                                        >
                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <button type='submit' className='w-full text-white rounded-[30px] bg-[#6672EA] hover:bg-[#3f4696] py-[10px] px-[32px] text-[32px] font-[500]'>Create Account</button>
                    </div>
                    <Link to='/login' className='text-center text-[#6672EA]'> Already have an account? <span className='underline'>Sign In</span></Link>
                </div>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                closeOnClick
                pauseOnHover
            />
        </div>
    )
}

export default Signup
