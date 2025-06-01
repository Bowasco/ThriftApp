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
    const [loading, setLoading] = useState(false)



    const handleSubmit = async (e) => {
        e.preventDefault();

        // CHECK IF ALL FIELDS ALL FILLED 
        if (!fullname || !username || !email || !password) {
            toast.error("All fields are required");
            return;
        }

        // PASSWORD MUST NOT BE LESS THAN 6 CHARACTERS 
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        // EMAIL VALIDATION 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid email format");
            return;
        }

        setLoading(true)

        // ARRAY FOR NEW MEMBER 
        const newGroup = {
            username,
            password,
            email,
            fullname,
            walletBalance: 0
        };

        // PUSH TO THE DATABASE AND EMPTY ALL FIELDS THEN NAVIGATE TO LOGIN
        try {
            await axios.post('http://localhost:5000/users', newGroup);
            toast.success("Account Created Successfully")
            setUsername("")
            setPassword("")
            setEmail("")
            setFullName("")
            setTimeout(() => {
                navigate("/login")
            }, 3000);
        } catch (error) {
            console.error('Signup error', error);
            toast.error("Error creating account")
        }
    }

    return (
        <div className='min-h-screen custom-bg'>
            <form onSubmit={handleSubmit} className='md:w-[690px] md:m-auto bg-white rounded-[30px]'>
                <div className='md:min-h-screen rounded-[30px] p-4 md:px-10 space-y-4'>
                    <div className='space-y-2 w-full'>
                        <h2 className='text-[38px] font-[600] text-center'>Create account</h2>
                        {/* FULL NAME  */}
                        <div>
                            <p className='text-[#00000080] text-[24px] font-[400]'>Full Name</p>
                            <input
                                name='username'
                                value={fullname}
                                className='mt-[22px] border w-full bg-[#6672EA33] pt-[10px] pb-[10px] pr-[32px] pl-[32px] rounded-[30px] focus:outline-none focus:ring-2'
                                type="text"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>

                        {/* USERNAME  */}
                        <div>
                            <p className='text-[#00000080] text-[24px] font-[400]'>Username</p>
                            <input
                                name='username'
                                value={username}
                                className='mt-[22px] border w-full bg-[#6672EA33] pt-[10px] pb-[10px] pr-[32px] pl-[32px] rounded-[30px] focus:outline-none focus:ring-2'
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        {/* EMAIL  */}
                        <div>
                            <p className='text-[#00000080] text-[24px] font-[400]'>Email</p>
                            <input
                                name='email'
                                value={email}
                                className='mt-[22px] border w-full bg-[#6672EA33] pt-[10px] pb-[10px] pr-[32px] pl-[32px] rounded-[30px] focus:outline-none focus:ring-2'
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* PASSWORD  */}
                        <div>
                            <p className='text-[#00000080] text-[24px] font-[400]'>Password</p>
                            <div className="relative mt-[22px]">
                                <input
                                    name="password"
                                    value={password}
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#6672EA33] border pt-[10px] pb-[10px] pr-[50px] pl-[32px] rounded-[30px] focus:outline-none focus:ring-2"
                                />
                                <span
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button type='submit' disabled={loading} className={`md:w-full text-white md:rounded-[30px] bg-[#6672EA] hover:bg-[#3f4696] py-[10px] px-[32px] md:text-[32px] font-[500] ${loading && 'opacity-50 cursor-not-allowed'}`}>{loading ? "Creating..." : "Create Account"}</button>
                        </div>
                    </div>
                    <Link to='/login' className=' text-[#6672EA] flex justify-center'> Already have an account? <span className='underline'> Sign In</span></Link>
                </div>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                closeOnClick
                pauseOnHover
            />
        </div>
    )
}

export default Signup