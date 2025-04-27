import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const navigate = useNavigate();        
    const [duration, setDuration] = useState("");
    const [plan, setPlan] = useState("")
    const [member, setMember] = useState("")
    const [amount, setAmount] = useState("")

    const calcInterest = amount ? (parseFloat(amount) * 0.1).toFixed(2) : "";

    const [group, setGroup] = useState({
        groupName: "",
        groupDuration: "",
        groupAmount: "",
        groupPlan: "",
        groupInterest: "",
        groupMembers: "",
    })

    const handleChange = (e) => {
        setGroup({ ...group, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newGroup = {
            ...group,
            groupDuration: duration,
            groupAmount: amount,
            groupPlan: plan,
            groupInterest: calcInterest,
            groupMembers: member
        };

        try {
            await axios.post("http://localhost:5000/availableGroups", newGroup);
            alert("Group created successfully")
            navigate("/group")
        } catch (error) {
            console.error("Error creating group:", error)
            alert("Failed to create group")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='w-[70%] m-auto '>
                <div className='flex flex-col gap-[30px]'>
                    <p className='text-[48px] font-[600] text-[#000000] text-center'>Create a Thrift</p>
                    <div className='flex flex-col justify-between gap-[32px]'>
                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-[32px]'>
                                <p className='text-[#00000080] text-[24px] font-[400]'>Enter group name</p>
                                <input
                                    name='groupName'
                                    type="text"
                                    onChange={handleChange}
                                    className='bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]'
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-[32px]'>
                                <label className='text-[#00000080] text-[24px] font-[400]'>Choose thrift duration</label>
                                <select
                                    name='groupDuration'
                                    value={duration}
                                    required
                                    onChange={(e) => {
                                        handleChange(e)
                                        setDuration(e.target.value)
                                    }
                                    }
                                    className="bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]"
                                >
                                    <option value="">-- Please set thrift duration --</option>
                                    <option value="7 days">7 days</option>
                                    <option value="14 days">14 days</option>
                                    <option value="30 days">30 days</option>
                                    <option value="1 year">1 year</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-[32px]'>
                                <p className='text-[#00000080] text-[24px] font-[400]'>Amount to be paid</p>
                                <input
                                    name='groupAmount'
                                    type="number"
                                    value={amount}
                                    className='bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]'
                                    min={1}
                                    onChange={(e) => {
                                        handleChange(e)
                                        setAmount(e.target.value)
                                    }}
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-[32px]'>
                                <label className='text-[#00000080] text-[24px] font-[400]'>Plan</label>
                                <select
                                    name='groupPlan'
                                    value={plan}
                                    required
                                    onChange={(e) => {
                                        handleChange(e)
                                        setPlan(e.target.value)
                                    }}
                                    className="bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]"
                                >
                                    <option value="">-- Please choose plan --</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-[32px]'>
                                <p className='text-[#00000080] text-[24px] font-[400]'>Interest if defaulted</p>
                                <input
                                    name='groupInterest'
                                    type="text"
                                    onChange={handleChange}
                                    className='bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]'
                                    value={calcInterest}
                                    min={0}
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-[32px]'>
                                <p className='text-[#00000080] text-[24px] font-[400]'>Members</p>
                                <input
                                    name='groupMembers'
                                    type="number"
                                    className='bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]'
                                    value={member}
                                    min={1}
                                    onChange={(e) => {
                                        handleChange(e)
                                        setMember(e.target.value)
                                    }}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* SUBMIT LINK */}
                    <div className='flex justify-center'>
                        <button
                            className='bg-[#6672EA] hover:bg-[#6269ac] text-white px-[10px] py-[22px] w-[600px] rounded-[30px] text-[32px] font-[500]'
                            type='submit'
                        >
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Create
