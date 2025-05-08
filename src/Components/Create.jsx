import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Create = () => {

    const navigate = useNavigate();
    const [groupName, setGroupName] = useState("");
    const [groupDuration, setGroupDuration] = useState("");
    const [groupAmount, setGroupAmount] = useState("");
    const [groupPlan, setGroupPlan] = useState("");
    const [groupInterest, setGroupInterest] = useState("");
    const [groupMembers, setGroupMembers] = useState("");

    const calcInterest = groupAmount ? (parseFloat(groupAmount) * 0.1).toFixed(2) : "";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newGroup = {
            groupName,
            groupDuration,
            groupAmount,
            groupPlan,
            groupInterest: calcInterest,
            groupMembers,
            members: []
        };

        try {
            const res = await axios.post("http://localhost:5000/availableGroups", newGroup);
            const createId = res.data.id;

            const groupLink = `http://localhost:3000/join_thrift/${createId}`;
            await axios.patch(`http://localhost:5000/availableGroups/${createId}`, {
                groupLink
            });

            alert("Group created successfully")
            navigate("/group")
        } catch (error) {
            console.error("Error creating group:", error)
            alert("Failed to create group")
        }
    }

    useEffect(() => {
        if (groupDuration === "7 days") {
            setGroupPlan("Daily")
        }else if (groupDuration === "30 days") {
            setGroupPlan("Weekly")
        }else if (groupDuration === "1 year") {
            setGroupPlan("Monthly")
        }
    }, [groupDuration])

    const handleDurationChange = (e) => {
        setGroupDuration(e.target.value);
    };
    

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
                                    onChange={(e) => setGroupName(e.target.value)}
                                    className='bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]'
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-[32px]'>
                                <label className='text-[#00000080] text-[24px] font-[400]'>Choose thrift duration</label>
                                <select
                                    name='groupDuration'
                                    required
                                    value={groupDuration}
                                    onChange={(e) => {
                                        handleDurationChange(e)
                                        setGroupDuration(e.target.value)}}
                                    className="bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]"
                                >
                                    <option value="">-- Please set thrift duration --</option>
                                    <option value="7 days">Week</option>
                                    <option value="30 days">Month</option>
                                    <option value="1 year">Year</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-[32px]'>
                                <p className='text-[#00000080] text-[24px] font-[400]'>Amount to be paid</p>
                                <input
                                    name='groupAmount'
                                    type="number"
                                    value={groupAmount}
                                    className='bg-[#6672EA33] w-[400px] px-[32px] py-[10px] focus:outline-none rounded-[30px] text-[#00000080] text-[24px]'
                                    min={1}
                                    onChange={(e) => setGroupAmount(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-[32px]'>
                                <label className='text-[#00000080] text-[24px] font-[400]'>Plan</label>
                                <select
                                    name='groupPlan'
                                    value={groupPlan}
                                    required
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
                        <div className='flex justify-between'>
                            <div className='flex flex-col gap-[32px]'>
                                <p className='text-[#00000080] text-[24px] font-[400]'>Interest if defaulted</p>
                                <input
                                    name='groupInterest'
                                    type="text"
                                    onChange={(e) => setGroupInterest(e.target.value)}
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
                                    value={groupMembers}
                                    min={1}
                                    onChange={(e) => setGroupMembers(e.target.value)}
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
