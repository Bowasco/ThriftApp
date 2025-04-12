import React from 'react'
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

const Dashboard = () => {
    return (
        <div className='bg-[#EFF2F9] h-screen flex'>
            <div className="w-3/12 h-screen bg-[#FFFFFF80] flex flex-col justify-between rounded-tr-[100px] rounded-br-[100px] py-10 px-[52px] text-white">
                <div>
                    <div className="mb-10">
                        <img src={Logo} alt="Logo" className="w-[90px] h-[28px]" />
                    </div>

                    <div className="flex flex-col gap-8 mt-24">
                        <button className="flex items-center gap-3 hover:text-gray-300 ">
                            <span><img src={dash} alt="" className='w-[24px] h-[24px]'/></span>
                            <span className='text-[24px] text-[#939393] font-[400]'>Dashboard</span>
                        </button>
                        <button className="flex items-center gap-3 hover:text-gray-300 ">
                            <span><img src={group} alt="" className='w-[24px]'/></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Group</span>
                        </button>
                        <button className="flex items-center gap-3 hover:text-gray-300 ">
                            <span><img src={wallet} alt="" className='w-[24px] h-[24px]'/></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Fund Wallet</span>
                        </button>
                        <button className="flex items-center gap-3 hover:text-gray-300 ">
                            <span><img src={message} alt="" className='w-[24px] h-[24px]'/></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Messages</span>
                        </button>
                        <button className="flex items-center gap-3 hover:text-gray-300 ">
                            <span><img src={payment} alt="" className='w-[24px] h-[24px]'/></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Track Payment</span>
                        </button>
                        <button className="flex items-center gap-3 hover:text-gray-300 ">
                            <span><img src={settings} alt="" className='w-[24px] h-[24px]'/></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Settings</span>
                        </button>
                        <button className="flex items-center gap-3 hover:text-gray-300 ">
                            <span><img src={logout} alt="" className='w-[24px] h-[24px]'/></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Log Out</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className=' w-4/6 mx-auto'>
                <div className='mt-[32px] flex justify-between'>
                    <div className='flex items-center gap-[7px] w-[625px] bg-[#FFFFFF] rounded-[30px] p-[10px]'>
                        <img src={search} alt="" className='w-[20px] h-[20px]'/>
                        <input type="text" placeholder='Search...' className='focus:outline-none w-full placeholder:text-[#D1D1D1] placeholder:text-[16px]' />
                    </div>
                    <div className='flex justify-between gap-[21px]'>
                        <div className='flex items-center gap-[24px]'>
                            <img src={speaker} alt=""  className='w-[24px] h-[24px]'/>
                            <img src={book} alt=""  className='w-[24px] h-[24px]'/>
                            <img src={notification} alt=""  className='w-[24px] h-[24px]'/>
                        </div>
                        <div>
                            <img src={profile} alt=""/>
                        </div>
                    </div>
                </div>
                <div>
                    
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Dashboard
