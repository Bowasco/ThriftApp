import React from 'react'
import Logo from '../Icons/LOGO.png'
import logout from '../Icons/ion_log-out.png'
import message from '../Icons/jam_envelope-f.png'
import dash from '../Icons/ic_round-dashboard (1).png'
import wallet from '../Icons/fontisto_wallet.png'
import settings from '../Icons/fluent_settings-48-filled.png'
import payment from '../Icons/material-symbols_history.png'
import group2 from '../Icons/typcn_group (1).png'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const GroupInfo = () => {

    const [thriftMembers, setThriftMembers] = useState([])
    const [thriftInfo, setThriftInfo] = useState({})
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")))
    const params = useParams()
    const navigate = useNavigate()


    const fetchThrift = () => {
        axios.get(`http://localhost:5000/availableGroups/${params.thrift_id}`).then((res) => {
            console.log(res.data);
            setThriftInfo(res.data);
            setThriftMembers(res.data.members)
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchThrift();
    }, [])


    const makePayment = async () => {

        const userResponse = await axios.get(`http://localhost:5000/users/${user.id}`);
        const currentUser = userResponse.data;

        const amountToPay = Number(thriftInfo.groupAmount)
        const userWallet = currentUser.walletBalance;
        const receivingNo = thriftInfo.receiving_id;

        console.log(typeof (amountToPay));
        console.log(typeof (userWallet));


        console.log(receivingNo);

        console.log(amountToPay, userWallet);

        if (userWallet < amountToPay) {
            alert("Insufficient funds, please recharge")
            return;
        }

        const updateUserWallet = userWallet - amountToPay

        const updateGroupWallet = thriftInfo.groupWallet + amountToPay

        const updateReceivingNo = Number(receivingNo) + 1

        try {
            // update user's wallet and payment status
            axios.patch(`http://localhost:5000/users/${user.id}`, {
                walletBalance: updateUserWallet,
                paymentStatus: "Paid"
            })


            // update the group wallet after user pays
            axios.patch(`http://localhost:5000/availableGroups/${thriftInfo.id}`, {
                groupWallet: updateGroupWallet,
            })

            const updatedMembers = thriftInfo.members.map(member => {
                if (member.id === user.id) {
                    return {
                        ...member,
                        paymentStatus: "Paid",
                        walletBalance: updateUserWallet
                    };
                }
                return member;
            });

            await axios.patch(`http://localhost:5000/availableGroups/${thriftInfo.id}`, {
                members: updatedMembers,
                groupWallet: updateGroupWallet
            });

            setThriftMembers(updatedMembers)
            toast.success("Payment Successful")

            const allPaid = updatedMembers.every(member => member.paymentStatus === "Paid");
            if (allPaid) {
                await disburseFunds()
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    }

    const disburseFunds = async () => {
        try {
            const groupRes = await axios.get(`http://localhost:5000/availableGroups/${thriftInfo.id}`)
            const group = groupRes.data

            const recipient = group.members.find(m => m.receiving_id === group.receiving_id)

            if (!recipient) {
                toast.error("Recipient not found");
                return
            }

            const userRes = await axios.get(`http://localhost:5000/users/${recipient.id}`);
            const recipientUser = userRes.data;

            await axios.patch(`http://localhost:5000/users/${recipient.id}`, {
                walletBalance: recipientUser.walletBalance + group.groupWallet
            })

            const resetMembers = group.members.map(m => ({
                ...m, paymentStatus: "Unpaid"
            }))

            // Step 5: Update group — reset wallet, increase receiving_id, reset members
            await axios.patch(`http://localhost:5000/availableGroups/${group.id}`, {
                groupWallet: 0,
                receiving_id: group.receiving_id + 1,
                members: resetMembers
            });

            toast.success(`${recipient.username} has received ₦${group.groupWallet}!`);
            fetchThrift(); // reload UI
        } catch (error) {
            console.error("Disbursement error:", error);
            toast.error("Disbursement failed");
        }
    }

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
            <div className=' w-4/6 mx-auto my-5 space-y-2 bg-white px-4 py-2'>
                <div>
                    <h1 className='text-2xl'>Thrift Wallet: ₦{thriftInfo.groupWallet}</h1>
                </div>
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full table-auto border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-gray-700 text-center">Username</th>
                                <th className="px-4 py-2 text-gray-700 text-center">Payment Status</th>
                                <th className="px-4 py-2 text-gray-700 text-center">Make Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {thriftMembers.map((el) => (
                                <tr key={el.id} className="border-t">
                                    <td className="px-4 py-2 text-center">{el.username}</td>
                                    <td className="px-4 py-2 text-center">
                                        <span className={el.paymentStatus === "Paid" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                                            {el.paymentStatus || "Unpaid"}
                                        </span>
                                    </td>
                                    <td>
                                        {user.id == el.id &&
                                            <div className='flex flex-col items-center'>
                                                <button
                                                    onClick={makePayment}
                                                    className="bg-blue-500 px-4 py-2 hover:bg-blue-600 rounded-lg text-white"
                                                >
                                                    Make Payment
                                                </button>
                                            </div>
                                        }

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

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

export default GroupInfo