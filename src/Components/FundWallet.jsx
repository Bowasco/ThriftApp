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


const FundWallet = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')))
    const [walletBalance, setWalletBalance] = useState(0)
    const [amount, setAmount] = useState("")
    const [walletHistory, setWalletHistory] = useState([])


    // GET THE WALLET BALANCE AND HISTORY FROM THE SERVER
    useEffect(() => {
        axios.get(`http://localhost:5000/users/${user.id}`)
            .then((res) => {
                setWalletBalance(res.data.walletBalance || 0);
                setWalletHistory(res.data.walletHistory || [])
            })
    }, [])


    const handleFund = async () => {
        const newBalance = walletBalance + Number(amount)
        const newAmount = Number(amount)

        // CREATE A NEW VAIRABLE FOR THE WALLET HISTORY
        const newTransaction = {
            id: Date.now(),
            amount: newAmount,
            date: new Date().toISOString()
        }

        try {
            const userRes = await axios.get(`http://localhost:5000/users/${user.id}`)
            const currentHistory = userRes.data.walletHistory || [];


            // UPDATE THE BALANCE AND HISTORY
            await axios.patch(`http://localhost:5000/users/${user.id}`, {
                walletBalance: newBalance,
                walletHistory: [...currentHistory, newTransaction]
            })

            await axios.patch(`http://localhost:5000/loggedInUser/${user.id}`, {
                walletBalance: newBalance,
                walletHistory: [...currentHistory, newTransaction]
            })

            // FETCH NEW DATA
            const updatedUser = await axios.get(`http://localhost:5000/users/${user.id}`);
            setWalletBalance(updatedUser.data.walletBalance || 0);
            setWalletHistory(updatedUser.data.walletHistory || []);

            // EMPTY THE INPUT AND POPUP MESSAGE
            setAmount('');
            toast.success("Wallet funded successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong")
        }
    }


    // LOGOUT FUNCTIONALITY
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
        <div className='bg-[#EFF2F9] flex h-screen'>

            {/* NAVIGATION BAR */}
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
                            <span className='text-[24px] text-[#54538A] font-[400]'>Group</span>
                        </Link>
                        <Link className="flex items-center gap-3 hover:text-gray-300" to='/fundwallet'>
                            <span><img src={wallet} alt="" className='w-[24px] h-[24px]' /></span>
                            <span className='text-[24px] text-[#939393] font-[400]'>Fund Wallet</span>
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

            {/* FUNDING WALLET */}
            <div className="p-6 max-w-md mx-auto my-10 bg-white rounded-xl shadow-md space-y-4">
                <h2 className="text-2xl font-bold">Fund Wallet</h2>
                <p>Current Balance: ₦{walletBalance}</p>
                <input
                    type="number"
                    placeholder="Enter amount"
                    className="border p-2 w-full rounded"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button
                    onClick={handleFund}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Funds
                </button>

                {/* DISPLAYING ALL TRANSATION HISTORY */}
                <div>
                    {walletHistory.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mt-6">Funding History</h3>
                            <ul className="space-y-2 mt-2">
                                {walletHistory.map(txn => (
                                    <li key={txn.id} className="text-sm">
                                        Funded ₦{txn.amount} on {new Date(txn.date).toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
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

export default FundWallet
