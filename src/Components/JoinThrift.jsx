import axios from 'axios';
import React, {useEffect, useState}from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const JoinThrift = () => {
    const params = useParams();
    const navigate = useNavigate()
    const [thrift, setThrift] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [thriftUser, setThriftUser] = useState(null)

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")));
    useEffect(() => {
        console.log(user);
        if (!user) {
            navigate('/login')
            return;
        }
        axios.get("http://localhost:5001/loggedInUser").then((res) => {
            console.log(res, "This is the response");
            if (res.data.length > 0) {
                if (res.data[0].id === user.id) {
                    setThriftUser(res.data[0])
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false)
                    navigate("/login")
                }
            } else {
                navigate("/login")
            }
        })
        console.log(user, "This is the user");
    }, [])
    useEffect(() => {
        console.log(params);
        if(params.thrift_id){
            axios.get(`http://localhost:5001/availableGroups/${params.thrift_id}`).then((res)=>{
                console.log(res);
                setThrift(res.data)
            }).catch((err)=>{
                if(err.status === 404){
                    alert("Thrift not found");
                    navigate("/")
                }
                console.log(err);
            })
            
        }
    }, [])

    const joinThrift = ()=>{
        const alreadyJoined = thrift.members.find((el) => el.id == thriftUser.id);
        if(alreadyJoined){
            alert("You're already in the thrift");
            return;
        }
        thrift.members.push(thriftUser);
        axios.patch(`http://localhost:5001/availableGroups/${thrift.id}`, thrift).then((res)=>{
            console.log(res);
            alert("Successfully joined thrift");
        }).catch(err=>{
            console.log(err);
        })
    }
    
    return (
    <div>
        {thrift && 
        <>
        <h1>Welcome to {thrift.groupName}</h1>
        <button onClick={joinThrift}>Join Thrift</button>
        </>
        }
    </div>
  )
}

export default JoinThrift