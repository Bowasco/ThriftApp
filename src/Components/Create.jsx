import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {

    const navigate = useNavigate();
    const [groupName, setGroupName] = useState("");
    const [groupDuration, setGroupDuration] = useState("");
    const [groupAmount, setGroupAmount] = useState("");
    const [groupPlan, setGroupPlan] = useState("");
    const [groupInterest, setGroupInterest] = useState("");
    const [groupMembers, setGroupMembers] = useState("");
    const [user, setUser] = useState("")

    const calcInterest = groupAmount ? (parseFloat(groupAmount) * 0.1).toFixed(2) : "";
    // console.log(calcInterest);
    

    useEffect(() => {
      axios.get("http://localhost:5000/loggedInUser").then((res)=>{
        console.log(res.data[0].id);
        setUser(res.data[0].id)
      })
    }, [])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        if (!groupName || !groupAmount || !groupDuration || !calcInterest || !groupMembers || !groupPlan) {
            toast.error("All fields are required");
            return;
        }

        const newGroup = {
            groupName,
            groupDuration,
            groupAmount,
            groupPlan,
            groupInterest: calcInterest,
            groupMembers,
            members: [],
            thriftCreator: user,
            completed: false,
            receiving_id: 1,
            groupWallet: 0
        };

        try {
            const res = await axios.post("http://localhost:5000/availableGroups", newGroup);
            const createId = res.data.id;

            const groupLink = `http://localhost:3000/join_thrift/${createId}`;
            await axios.patch(`http://localhost:5000/availableGroups/${createId}`, {
                groupLink
            });

            toast.success("Group created successfully");
            setTimeout(() => {
                navigate("/group");
            }, 4000);
        } catch (error) {
            console.error("Error creating group:", error)
            toast.error("Error creating group")
        }
    }

    useEffect(() => {
        if (groupDuration === "7 days") {
            setGroupPlan("Daily")
        } else if (groupDuration === "30 days") {
            setGroupPlan("Weekly")
        } else if (groupDuration === "1 year") {
            setGroupPlan("Monthly")
        }
    }, [groupDuration])

    // const handleDurationChange = (e) => {
    //     setGroupDuration(e.target.value);
    // };


    return (
        <div>
            <form onSubmit={handleSubmit} className='md:w-[70%] md:m-auto '>
                <div className='space-y-8'>
                    <p className=' text-[30px] md:text-[48px] font-[600] text-[#000000] text-center'>Create a Thrift</p>
                    <div className='space-y-5 '>
                        <div className='lg:grid lg:grid-cols-2 gap-[60px]'>
                            <div className='space-y-4'>
                                <p className='text-[#00000080] text-[24px] font-[400]'>Enter group name</p>
                                <input
                                    name='groupName'
                                    type="text"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    className='bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]'
                                />
                            </div>
                            <div className='space-y-4'>
                                <label className='text-[#00000080] text-[24px] font-[400]'>Choose thrift duration</label>
                                <select
                                    name='groupDuration'
                                    value={groupDuration}
                                    onChange={(e) => {
                                        // handleDurationChange(e)
                                        setGroupDuration(e.target.value)
                                    }}
                                    className="bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]"
                                >
                                    <option value="">-- Please set thrift duration --</option>
                                    <option value="7 days">Week</option>
                                    <option value="30 days">Month</option>
                                    <option value="1 year">Year</option>
                                </select>
                            </div>
                        </div>
                        <div className='lg:grid lg:grid-cols-2 gap-[60px]'>
                            <div className='space-y-4'>
                                <p className='text-[#00000080] text-[24px] font-[400]'>Amount to be paid</p>
                                <input
                                    name='groupAmount'
                                    type="number"
                                    value={groupAmount}
                                    className='bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]'
                                    min={1}
                                    onChange={(e) => setGroupAmount(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <label className='text-[#00000080] text-[24px] font-[400]'>Plan</label>
                                <select
                                    name='groupPlan'
                                    value={groupPlan}
                                    disabled
                                    onChange={(e) => setGroupPlan(e.target.value)}
                                    className="bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]"
                                >
                                    <option value="">-- Please choose plan --</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>
                        </div>
                        <div className='lg:grid lg:grid-cols-2 gap-[60px]'>
                            <div className='space-y-4'>
                                <p className='text-[#00000080] text-[24px] font-[400]'>Interest if defaulted</p>
                                <input
                                    name='groupInterest'
                                    type="number"
                                    readOnly
                                    className='bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]'
                                    value={calcInterest}
                                />
                            </div>
                            <div className='space-y-4'>
                                <p className='text-[#00000080] text-[24px] font-[400]'>Members</p>
                                <input
                                    name='groupMembers'
                                    type="number"
                                    className='bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]'
                                    value={groupMembers}
                                    min={1}
                                    onChange={(e) => setGroupMembers(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* SUBMIT LINK */}
                    <div className='flex justify-center'>
                        <button
                            className='bg-[#6672EA] hover:bg-[#6269ac] text-white px-[20px] py-[10px] rounded-xl md:px-[18px] md:py-[10px] md:w-[400px] md:rounded-[30px] text-[32px] font-[500]'
                            type='submit'
                        >
                            Create
                        </button>
                    </div>
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

export default Create