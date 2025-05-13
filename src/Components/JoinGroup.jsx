import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaCopy } from "react-icons/fa";

const JoinGroup = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [thrift, setThrift] = useState(null);
  const [thriftUser, setThriftUser] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")));


  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate('/login')
      return;
    }
    axios.get('http://localhost:5000/loggedInUser').then((res) => {
      console.log(res);
      if (res.data.length > 0) {
        if (res.data[0].id === user.id) {
          setThriftUser(res.data[0])
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          navigate("/login")
        }
      }
    }).catch((err) => {
      console.log(err, 'Error fetching user');
      navigate('/login')
    })
  }, [])

  useEffect(() => {
    console.log(params);
    console.log(params.thrift_id);
    if (params.thrift_id) {
      axios.get(`http://localhost:5000/availableGroups/${params.thrift_id}`).then((res) => {
        console.log(res);
        setThrift(res.data)
      }).catch((err) => {
        if (err.status === 404) {
          console.log("Thrift not found");
          navigate('/')
        }
        console.log(err);
      })
    }
  }, [])


  const joinThrift = () => {
    const alreadyJoinedThrift = thrift.members.find((el) => el.id == thriftUser.id)
    const groupCapacity = thrift.groupMembers.length;
    const currentMembers = thrift.members.length;

    if (currentMembers >= groupCapacity) {
      alert("Group is full")
      return;
    }

    if (alreadyJoinedThrift) {
      alert("You are already in the Thrift");
      return;
    }
    thrift.members.push(thriftUser)
    axios.patch(`http://localhost:5000/availableGroups/${thrift.id}`, thrift).then((res) => {
      console.log(res);
      alert('Successfully joined Thrift')
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className=' h-screen flex custom-bg'>
      <div className='bg-white w-[718px] m-auto border rounded-xl flex flex-col  mt-20 h-96 justify-between'>
        {
          thrift &&
          <>
            <h1 className='text-center text-[48px]'>Welcome to {thrift.groupName}</h1>
            <h2 className='text-[30px]'>Thrift Amount- {thrift.groupAmount}</h2>
            <h2 className='text-[30px]'>Thrift Members- {thrift.groupMembers}</h2>
            <h2 className='text-[30px]'>Thrift Duration- {thrift.groupDuration}</h2>
            <div className='flex gap-5 items-center'>
              <h2 className='text-[30px]'>Thrift Link- <span className='text-lg '>{thrift.groupLink}</span></h2>
              <FaCopy onClick={()=>{
                navigator.clipboard.writeText(thrift.groupLink)
                alert('Link copied to clipboard')
              }}/>
            </div>
            <button className='w-full text-white rounded-[30px] bg-[#6672EA] py-[10px] px-[32px] text-[32px] font-[500] hover:bg-[#3f4696]' onClick={joinThrift}>Join Thrift</button>
            <Link to='/group'>
              <p className='text-center border rounded-full'>Back</p>
            </Link>
          </>
        }
      </div>
    </div>
  )
}

export default JoinGroup
