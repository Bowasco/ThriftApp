import React from 'react'
import Logo from '../Icons/LOGO.png'
import logout from '../Icons/ion_log-out.png'
import message from '../Icons/jam_envelope-f.png'
import dash from '../Icons/ic_round-dashboard (1).png'
import wallet from '../Icons/fontisto_wallet.png'
import settings from '../Icons/fluent_settings-48-filled.png'
import payment from '../Icons/material-symbols_history.png'
import group2 from '../Icons/typcn_group.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";

const Settings = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')))
    const [userUsername, setUserUsername] = useState("")
    const [password, setPassword] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [showSidebar, setShowSidebar] = useState(false);

    // FETCH USER'S DATA TO DISPLAY
    useEffect(() => {
        if (!user) {
            navigate("/login")
            return;
        }

        axios.get(`http://localhost:5000/users/${user.id}`)
            .then((res) => {
                console.log(res);
                setUserUsername(res.data.username);
                setPassword(res.data.password);
                setUserEmail(res.data.email);
                setFullName(res.data.fullname);
                setPhoneNumber(res.data.PhoneNumber)
            })
    }, [user])

    // UPDATE THE PROFILE IN THE BACKEND
    const handleSave = async () => {

        // CHECK IF NO INPUT FILLED IS EMPTY
        if (!fullName || !userUsername || !phoneNumber) {
            return toast.error("All fields must be filled");
        }

        // Update the new changes into the database and alert
        try {
            await axios.patch(`http://localhost:5000/users/${user.id}`, {
                username: userUsername,
                fullname: fullName,
                PhoneNumber: phoneNumber
            })
            toast.success("Profile updated")
        } catch (error) {
            console.log("Error updating profile", error);
        }
    }


    const updatePassword = async () => {
        // check if current password matches the password in the db  
        if (currentPassword !== password) {
            toast.error("Current password is incorrect")
            return;
        }

        // check if new password and confirm password is correct
        if (newPassword !== newPassword2) {
            toast.error("New password do not match")
            return;
        }

        try {
            // Change the old password to the new password in the user's database
            await axios.patch(`http://localhost:5000/users/${user.id}`, {
                password: newPassword
            });

            // update new password in the loggedinuser db
            await axios.patch(`http://localhost:5000/loggedInUser/${user.id}`, {
                password: newPassword
            })
            toast.success("Password changed");

            // Empty the inputs
            setCurrentPassword("")
            setNewPassword("")
            setNewPassword2("")
        } catch (error) {
            console.log("Error changing password", error);
            toast.error("Error changing password")
        }
    }

    const handleDelete = async () => {
        try {

            // Confirm deletion with a prompt
            const isConfirmed = window.confirm("Are you sure you want to delete your account?")
            if (!isConfirmed) {
                return;
            }
            // Fetch all groups and check with id if the user is in any thrift
            const allGroup = await axios.get(`http://localhost:5000/availableGroups`)
            const allGroupsData = allGroup.data

            const isInGroup = allGroupsData.some(group => group.members.some(m => m.id === user.id))

            if (isInGroup) {
                toast.error("You cannot delete your account while still in a thrift.");
                return;
            }

            // Remove item in the localStorage
            localStorage.removeItem("loggedInUser")
            // Delete the user in the db and alert successful
            await axios.delete(`http://localhost:5000/users/${user.id}`)
            toast.success("Account deleted successfully")
            setTimeout(() => {
                navigate("/signup")
            }, 3000);
        } catch (error) {
            console.log("Error deleting account", error);
            toast.error("Error deleting user")
        }
    }


    // LOGOUT FUNCTIONALITY
    const handleLogOut = async () => {
        // Confirm logout with a prompt
        const isConfirmed = window.confirm("Confirm Logout?")
        if (!isConfirmed) {
            return;
        }

        try {
            // Empty the localStorage then delete from the loggedinuser array
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
        <div className='bg-[#EFF2F9] md:flex h-screen'>

            <div className="md:hidden flex justify-between items-center px-4 py-4 bg-white">             
                <button onClick={() => setShowSidebar(!showSidebar)} className="text-3xl text-[#333]">
                    <RxHamburgerMenu />
                </button>
                <img src={Logo} alt="Logo" className="w-[90px] h-[28px]" />
            </div>


            <nav className="hidden md:flex md:w-3/12 overflow-y-auto bg-[#FFFFFF80] flex-col justify-between rounded-tr-[100px] rounded-br-[100px] py-10 px-[52px] text-white">
                <div>
                    <div className="mb-10">
                        <img src={Logo} alt="Logo" className="w-[90px] h-[28px]" />
                    </div>

                    <div className="flex flex-col gap-8 mt-18">
                        <Link className="flex items-center gap-3 hover:text-gray-300" to='/dashboard'>
                            <span><img src={dash} alt="" className='w-[24px] h-[24px]' /></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Dashboard</span>
                        </Link>
                        <Link className="flex items-center gap-3 hover:text-gray-300" to='/group'>
                            <span><img src={group2} alt="" className='w-[24px]' /></span>
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
                        <Link className="flex items-center gap-3 hover:text-gray-300">
                            <span><img src={settings} alt="" className='w-[24px] h-[24px]' /></span>
                            <span className='text-[24px] text-[#939393] font-[400]'>Settings</span>
                        </Link>
                        <Link className="flex items-center gap-3 hover:text-gray-300" onClick={handleLogOut}>
                            <span><img src={logout} alt="" className='w-[24px] h-[24px]' /></span>
                            <span className='text-[24px] text-[#54538A] font-[400]'>Log Out</span>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className=' w-4/6 mx-auto my-5 space-y-2'>
                <div className='bg-white space-y-5 p-5 rounded-lg'>
                    <h2 className='text-2xl'>Profile Settings</h2>
                    <div className='md:flex justify-between '>
                        <div className='md:space-x-3'>
                            <label>Full Name:</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className='border rounded-md focus-within:outline-none py-1 px-3' />
                        </div>
                        <div className='md:space-x-3'>
                            <label>Username:</label>
                            <input
                                type="text"
                                value={userUsername}
                                onChange={(e) => setUserUsername(e.target.value)}
                                className='border rounded-md focus-within:outline-none py-1 px-3' />
                        </div>
                    </div>
                    <div className='md:flex justify-between'>
                        <div className='md:space-x-3'>
                            <label>Phone Number:</label>
                            <input
                                type="number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className='border rounded-md focus-within:outline-none py-1 px-3' />
                        </div>
                        <div className='md:space-x-3'>
                            <label>Email:</label>
                            <input
                                type="text"
                                value={userEmail}
                                disabled
                                className='border rounded-md focus-within:outline-none py-1 px-3 cursor-not-allowed' />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
                    </div>
                </div>

                <div className='bg-white space-y-5 p-5 rounded-lg'>
                    <h2 className='text-2xl'>Change Password</h2>
                    <div className='md:space-x-3'>
                        <label>Current Password:</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className='border rounded-md focus-within:outline-none py-1 px-3' />
                    </div>
                    <div className='md:flex justify-between'>
                        <div className='md:space-x-3'>
                            <label>New Password:</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='border rounded-md focus-within:outline-none py-1 px-3' />
                        </div>
                        <div className='md:space-x-3'>
                            <label>Confirm New Password:</label>
                            <input
                                type="password"
                                value={newPassword2}
                                onChange={(e) => setNewPassword2(e.target.value)}
                                className='border rounded-md focus-within:outline-none py-1 px-3' />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={updatePassword} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update Password</button>
                    </div>
                </div>

                <button onClick={handleDelete} className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-bold">DELETE ACCOUNT</button>
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

export default Settings