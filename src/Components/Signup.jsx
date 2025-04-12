import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', formData);
            alert('Account Created Successfully');
            setFormData({
                username: '',
                email: '',
                password: ''
              });
        } catch (error) {
            console.error('Signup error', error);
            alert('Signup failed')
        }
    }



    return (
        <div className='h-screen flex custom-bg'>
            <form onSubmit={handleSubmit} className='w-[718px] m-auto bg-white rounded-[30px]'>
                <div className=' m-auto bg-white flex flex-col gap-[22px] rounded-[30px] p-5'>
                    <div className='w-[690px] m-auto flex flex-col gap-[42px] px-[64px]'>
                        <div>
                            <h2 className='text-[48px] font-[600] text-center'>Create account</h2>
                            <div className='flex flex-col gap-[24px]'>
                                <div>
                                    <p className='text-[#00000080] text-[24px] font-[400]'>Username</p>
                                    <input
                                        name='username'
                                        value={formData.username}
                                        className='mt-[22px] border w-full bg-[#6672EA33] pt-[10px] pb-[10px] pr-[32px] pl-[32px] rounded-[30px] focus:outline-none'
                                        type="text"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <p className='text-[#00000080] text-[24px] font-[400]'>Email</p>
                                    <input
                                        name='email'
                                        value={formData.email}
                                        className='mt-[22px] border w-full bg-[#6672EA33] pt-[10px] pb-[10px] pr-[32px] pl-[32px] rounded-[30px] focus:outline-none'
                                        type="email"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <p className='text-[#00000080] text-[24px] font-[400]'>Password</p>
                                    <input
                                        name='password'
                                        value={formData.password}
                                        className='mt-[22px] border w-full bg-[#6672EA33] pt-[10px] pb-[10px] pr-[32px] pl-[32px] rounded-[30px] focus:outline-none'
                                        type="password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='w-full text-white rounded-[30px] bg-[#6672EA] hover:bg-[#3f4696] py-[10px] px-[32px] text-[32px] font-[500]'>Create Account</button>
                    </div>
                    <Link to='/login' className='text-center text-[#6672EA]'> Already have an account? <span className='underline'>Sign In</span></Link>
                </div>
            </form>
        </div>
    )
}

export default Signup
