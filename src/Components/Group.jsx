import React from 'react'
import Logo from '../Icons/LOGO.png'
import logout from '../Icons/ion_log-out.png'
import message from '../Icons/jam_envelope-f.png'
import dash from '../Icons/ic_round-dashboard (1).png'
import wallet from '../Icons/fontisto_wallet.png'
import settings from '../Icons/fluent_settings-48-filled.png'
import payment from '../Icons/material-symbols_history.png'
import group2 from '../Icons/typcn_group (1).png'
import search from '../Icons/Vector (4).png'
import speaker from '../Icons/heroicons-solid_speakerphone.png'
import book from '../Icons/Vector (5).png'
import notification from '../Icons/Vector (6).png'
import profile from '../Icons/Ellipse 1.png'
import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { RxHamburgerMenu } from "react-icons/rx";

const Group = () => {
    const navigate = useNavigate()
    const [group, setGroup] = useState([])
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')))
    const [filteredGroups, setFilteredGroups] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {

        // CHECK FOR USER 
        if (!user) {
            navigate("/login")
            return;
        }

        // FETCH ALL GROUPS 
        axios.get('http://localhost:5000/availableGroups')
            .then((res) => {
                setGroup(res.data);
                setFilteredGroups(res.data);
            })
            .catch((error) => {
                console.error("Error fetching the groups", error);
            })
    }, [])

    // Search filter 
    useEffect(() => {
        const filtered = group.filter(group =>
            group.groupName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredGroups(filtered)
    }, [searchQuery, group])

    // Calculate the group target 
    const calculateGroupTarget = (group) => {
        const amount = parseInt(group.groupAmount);
        const members = parseInt(group.groupMembers);

        const target = amount * members
        return target;
    }

    // Check if the user is part of the getThrift, if not return
    const getThrift = (id) => {
        axios.get(`http://localhost:5000/availableGroups/${id}`).then((res) => {
            const joinedThrift = res.data.members;
            const foundMember = joinedThrift.find((el) => el.id == user.id)

            if (!foundMember) {
                toast.error("You are not a member of this thrift")
                return;
            }
            navigate(`/groupInfo/${id}`)
        })
    }

    // HANDLE LOGOUT 
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
                }, 3000);
            }
        } catch (error) {
            console.log('Unable to logout', error);
            toast.error("Error logging out")
        }
    }

    return (
        <div className='bg-[#EFF2F9] md:flex min-h-screen'>

            <div className="md:hidden flex justify-between items-center px-4 py-4 bg-white">
                <button onClick={() => setShowSidebar(!showSidebar)} className="text-3xl text-[#333]">
                    <RxHamburgerMenu />
                </button>
                <img src={Logo} alt="Logo" className="w-[90px] h-[28px]" />
            </div>


            {/* SIDENAV */}
            <nav className="hidden md:flex md:w-3/12 overflow-y-auto bg-[#FFFFFF80] flex-col justify-between rounded-tr-[100px] rounded-br-[100px] py-10 px-[52px] text-white">
                <div>
                    <div className="mb-10">
                        <img src={Logo} alt="Logo" className="w-[90px] h-[28px]" />
                    </div>

                    <div className="flex flex-col gap-8 mt-24">
                        <Link className="flex items-center gap-3 hover:text-gray-300" to='/dashboard'>
                            <span><img src={dash} alt="" className='w-[24px] h-[24px]' /></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Dashboard</span>
                        </Link>
                        <Link className="flex items-center gap-3 hover:text-gray-300" to='/group'>
                            <span><img src={group2} alt="" className='w-[24px]' /></span>
                            <span className='text-[24px] text-[#939393] font-[400]'>Group</span>
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



            <div className=' w-4/6 mx-auto'>

                <div className='mt-8 flex flex-col md:flex-row md:justify-between gap-4'>

                    {/* Search Input */}
                    <div className='flex items-center gap-[7px] w-full md:w-[625px] bg-white rounded-[30px] p-[10px]'>
                        <img src={search} alt="" className='w-[20px] h-[20px]' />
                        <input
                            type="text"
                            placeholder='Search...'
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                            }}
                            className='focus:outline-none w-full placeholder:text-[#D1D1D1] placeholder:text-[16px]'
                        />
                    </div>

                    <div className='hidden md:flex justify-between md:justify-end items-center gap-[21px] flex-nowrap'>
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


                <div className="mt-10 flex flex-col gap-6">

                    {/* CREATE A THRIFT  */}
                    <div className="flex justify-end">
                        <div className='flex items-center gap-[16px] text-[#54538A] text-[24px] font-[400]'>
                            <Link className='flex items-center gap-[16px]' to='/create'>
                                <FaPlus />
                                <p>Create a Thrift</p>
                            </Link>
                        </div>
                    </div>


                    {/* ALL THRIFTS */}
                    {filteredGroups.map((group) => (
                        <div key={group.id} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-md">
                            <div onClick={() => getThrift(group.id)}>
                                <h2 className="text-[#6672EA] text-[32px] font-[600] text-lg">{group.groupName}</h2>
                                <p className="text-gray-500 text-[20px] font-[400]">
                                    ₦{group.groupAmount} {group.groupPlan.toLowerCase()} pack ₦{calculateGroupTarget(group)} • {group.members?.length || 0}/{group.groupMembers} members
                                </p>
                                <p>{group.thriftCreator === user.id && group.groupLink}</p>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                closeOnClick
                pauseOnHover
            />
        </div>
    )
}

export default Group
