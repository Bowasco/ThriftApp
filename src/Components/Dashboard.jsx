import React, { useEffect, useState } from 'react'
import Logo from '../Icons/LOGO.png'
import logout from '../Icons/ion_log-out.png'
import message from '../Icons/jam_envelope-f.png'
import dash from '../Icons/ic_round-dashboard.png'
import wallet from '../Icons/fontisto_wallet.png'
import settings from '../Icons/fluent_settings-48-filled.png'
import payment from '../Icons/material-symbols_history.png'
import group from '../Icons/typcn_group.png'
import search from '../Icons/Vector (4).png'
import speaker from '../Icons/heroicons-solid_speakerphone.png'
import book from '../Icons/Vector (5).png'
import notification from '../Icons/Vector (6).png'
import profile from '../Icons/Ellipse 1.png'
import chart from '../Images/Frame 27.png'
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const Dashboard = () => {

    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")))
    const [accountBalance, setAccountBalance] = useState(null)

    useEffect(() => {
        console.log(user);
        if (!user) {
            navigate("/login")
            return;
        }
        axios.get('http://localhost:5000/loggedInUser').then((res) => {
            console.log(res)
            if (res.data.length > 0) {
                if (res.data[0].id === user.id) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                    navigate("/login")
                }
            } else {
                navigate("/login")
            }
        }).catch((err) => {
            console.log(err, "There is error fetching data");
        })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/loggedInUser/${user.id}`)
            .then((res) => {
                console.log(res);
                setAccountBalance(res.data.walletBalance);
            })
    }, [])


    const handleLogOut = async () => {
        const isConfirmed = window.confirm("Confirm Logout?")
        if (!isConfirmed) {
            return;
        }

        try {
            localStorage.removeItem("loggedInUser");
            if (user) {
                await axios.delete(`http://localhost:5000/loggedInUser/${user.id}`)
                toast.success("Logout Successful")
                setTimeout(() => {
                    navigate('/login')
                }, 4000);
            }
        } catch (error) {
            console.log('Unable to logout', error);
            toast.error("Error logging out")
        }
    }



    return (
        <div className='bg-[#EFF2F9] flex flex-col md:flex-row min-h-screen'>

            {/* SIDENAV */}
            <nav className="hidden md:flex md:w-3/12 overflow-y-auto bg-[#FFFFFF80] flex-col justify-between rounded-tr-[100px] rounded-br-[100px] py-10 px-[52px] text-white">
                <div>
                    <div className="mb-10">
                        <img src={Logo} alt="Logo" className="w-[90px] h-[28px]" />
                    </div>

                    <div className="flex flex-col gap-8 mt-24">
                        <Link className="flex items-center gap-3 hover:text-gray-300">
                            <span><img src={dash} alt="" className='w-[24px] h-[24px]' /></span>
                            <span className='text-[24px] text-[#939393] font-[400]'>Dashboard</span>
                        </Link>
                        <Link className="flex items-center gap-3 hover:text-gray-300" to='/group'>
                            <span><img src={group} alt="" className='w-[24px]' /></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Group</span>
                        </Link>
                        <Link className="flex items-center gap-3 hover:text-gray-300" to='/fundwallet'>
                            <span><img src={wallet} alt="" className='w-[24px] h-[24px]' /></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Fund Wallet</span>
                        </Link>
                        <Link className="flex items-center gap-3 hover:text-gray-300">
                            <span><img src={message} alt="" className='w-[24px] h-[24px]' /></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Messages</span>
                        </Link>
                        <Link className="flex items-center gap-3 hover:text-gray-300">
                            <span><img src={payment} alt="" className='w-[24px] h-[24px]' /></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Track Payment</span>
                        </Link>
                        <Link className="flex items-center gap-3 hover:text-gray-300" to='/settings'>
                            <span><img src={settings} alt="" className='w-[24px] h-[24px]' /></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Settings</span>
                        </Link>
                        <Link className="flex items-center gap-3 hover:text-gray-300" onClick={handleLogOut}>
                            <span><img src={logout} alt="" className='w-[24px] h-[24px]' /></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Log Out</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT */}
            <div className='w-full md:w-9/12 mx-auto px-4 flex-grow'>
                <div className='mt-8 flex flex-col md:flex-row md:justify-between gap-4'>
                    <div className='flex items-center gap-[7px] w-full md:w-[625px] bg-white rounded-[30px] p-[10px]'>
                        <img src={search} alt="" className='w-[20px] h-[20px]' />
                        <input
                            type="text"
                            placeholder='Search...'
                            className='focus:outline-none w-full placeholder:text-[#D1D1D1] placeholder:text-[16px]'
                        />
                    </div>

                    <div className='flex justify-between md:justify-end items-center gap-[21px] flex-wrap'>
                        <div className='flex items-center gap-[12px] md:gap-[24px]'>
                            <img src={speaker} alt="" className='w-[24px] h-[24px]' />
                            <img src={book} alt="" className='w-[24px] h-[24px]' />
                            <img src={notification} alt="" className='w-[24px] h-[24px]' />
                        </div>
                        <div>
                            <img src={profile} alt="" className='w-[36px] h-[36px] object-cover rounded-full' />
                        </div>
                    </div>
                </div>

                {/* GRAPHICAL REPRESENTATION AND HISTORY */}
                <div className='mt-10'>
                    <div className='bg-white w-full flex flex-wrap gap-10 px-[20px] md:px-[42px] py-[10px] rounded-t-[30px]'>
                        <div className='flex gap-[24px]'>
                            <p className='text-[18px] font-[600] text-[#494882]'>1Y</p>
                            <p className='text-[18px] font-[600] text-[#494882]'>4M</p>
                            <p className='text-[18px] font-[600] text-[#494882]'>3M</p>
                            <p className='text-[18px] font-[600] text-[#494882]'>1M</p>
                        </div>
                        <div>
                            <p className='text-[18px] font-[600] text-[#494882]'>ALL</p>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5'>
                        <div className="bg-[#6672EA] py-3 px-[42px]">
                            <p className='text-[17px] text-[#FFFFFF] font-[600]'>ACCOUNT BALANCE</p>
                            <p className='text-[28px] text-[#FFFFFF] font-[400]'>₦{accountBalance}</p>
                        </div>
                        <div className="bg-[#7395F9] py-3 px-[42px]">
                            <p className='text-[17px] text-[#FFFFFF] font-[600]'>NEW MEMBERS</p>
                            <p className='text-[28px] text-[#FFFFFF] font-[600]'>2</p>
                        </div>
                        <div className="bg-[#7395F9] py-3 px-[42px]">
                            <p className='text-[17px] text-[#FFFFFF] font-[600]'>SUCCESSFUL PAYMENTS</p>
                            <p className='text-[28px] text-[#FFFFFF] font-[600]'>121</p>
                        </div>
                    </div>

                    <div>
                        <img src={chart} alt="" className='w-full object-contain' />
                    </div>

                    <div className='bg-[#FEFEFEE5] w-full flex flex-wrap gap-4 justify-between px-[20px] md:px-[42px] pb-10 rounded-b-[30px]'>
                        <p className='text-[13px] font-[600] text-[#818181]'>03/18</p>
                        <p className='text-[13px] font-[600] text-[#818181]'>03/19</p>
                        <p className='text-[13px] font-[600] text-[#818181]'>03/20</p>
                        <p className='text-[13px] font-[600] text-[#818181]'>03/21</p>
                        <p className='text-[13px] font-[600] text-[#818181]'>03/22</p>
                        <p className='text-[13px] font-[600] text-[#818181]'>03/23</p>
                        <p className='text-[13px] font-[600] text-[#818181]'>Today</p>
                    </div>
                </div>

                <div className='mt-10'>
                    <div className='bg-[#FFFFFF] grid grid-cols-1 sm:grid-cols-3 rounded-t-[30px] pt-2'>
                        <div className='px-7 py-2 text-[16px] font-[700] text-[#6672EA]'>
                            <p>PENDING</p>
                        </div>
                        <div className='px-7 py-2 text-[16px] font-[700] text-[#6672EA]'>
                            <p>DISPUTES</p>
                        </div>
                        <div className='px-7 py-2 text-[16px] font-[700] text-[#6672EA]'>
                            <p>RADAR</p>
                        </div>
                    </div>

                    <div className='bg-[#F5F6FA] grid grid-cols-1 sm:grid-cols-3 rounded-b-[30px]'>
                        <div className=' border-r px-7 flex flex-col gap-[62px] py-[16px]'>
                            <div className='text-[#555555]'>
                                <p className='text-[24px] font-[500]'>₦5,000</p>
                                <p className='text-[17px] font-[500]'>Next transfer</p>
                            </div>
                            <div className='flex items-center gap-[8px] text-[#565656]'>
                                <p className='text-[17px] font-[500]'>Next transfers</p>
                                <FaAngleRight />
                            </div>
                        </div>
                        <div className=' border-r px-7 flex flex-col gap-[62px] py-[16px]'>
                            <div className='text-[#555555]'>
                                <p className='text-[24px] font-[500]'>0 unanswered</p>
                                <p className='text-[17px] font-[500]'>In the past 2 weeks</p>
                            </div>
                            <div className='flex items-center gap-[8px] text-[#565656]'>
                                <p className='text-[17px] font-[500]'>View disputes</p>
                                <FaAngleRight />
                            </div>
                        </div>
                        <div className='px-7 flex flex-col gap-[62px] py-[16px]'>
                            <div className='text-[#555555] text-[24px]'>
                                <p className='text-[24px] font-[500]'>0 payment to review</p>
                                <p className='text-[17px] font-[500]'>In the past 2 weeks</p>
                            </div>
                            <div className='flex items-center gap-[8px] text-[#565656]'>
                                <p className='text-[17px] font-[500]'>View reviews</p>
                                <FaAngleRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                closeOnClick
                pauseOnHover
            />
        </div>
    )
}

export default Dashboard
