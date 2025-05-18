import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const OneThrift = () => {
    const [thriftMembers, setThriftMembers] = useState([])
    const [thriftInfo, setThriftInfo] = useState({})
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")))
    const params = useParams();

    const alreadyLoggedInF = async () => {
        await axios.get('http://localhost:5001/loggedInUser')
          .then((res) => {
            if (res.data.length > 0) {
              setUser(res.data[0])
            }
          })
    }

    const fetchThrift = ()=>{
        axios.get(`http://localhost:5001/availableGroups/${params.thrift_id}`).then((res)=>{
            console.log(res.data);
            setThriftInfo(res.data);
            setThriftMembers(res.data.members)
          }).catch((err)=>{
            console.log(err);
          })
    }
    useEffect(() => {
        alreadyLoggedInF();
        fetchThrift();
    }, [])

    const makePayment = ()=>{
        const amountToPay = thriftInfo.groupAmount;
        console.log(amountToPay);
        const userWallet = user.walletBalance;
        console.log(userWallet);
        if(userWallet < amountToPay){
            alert("Insufficent balance, please top up your balance");
            return;
        }

    }
  return (
    <>
        <div>
            <div>
                <h1>Thrift Wallet: ₦{thriftInfo.groupWallet}</h1>
            </div>
        </div>
       {
       thriftMembers.length < 1 ?
       <h1>There are no members yet</h1>:
       <div>
        {thriftMembers.map((el)=>(
            <div>
                {el.username}: <button>Withdraw funds</button>
            </div>
        ))}
       </div>
       }
       <div>
        <button onClick={makePayment} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Make Payment</button>
       </div>
    </>
  )
}

export default OneThrift