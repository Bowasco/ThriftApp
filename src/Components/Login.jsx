import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {

  const navigate = useNavigate()
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false)

  const [formData, setformData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  const alreadyLoggedInF = async () => {
    await axios.get('http://localhost:5000/loggedInUser')
      .then((res) => {
        if (res.data.length > 0) {
          setAlreadyLoggedIn(true)
          navigate("/dashboard");
        }
      })
  }

  useEffect(() => {
    alreadyLoggedInF();
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('http://localhost:5000/users');
      const user = res.data.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        console.log(user);
        axios.post('http://localhost:5000/loggedInUser', user)
          .then((res) => {
            console.log(res);
            localStorage.setItem('loggedInUser', JSON.stringify(res.data));
            alert("Login successful")
            navigate('/dashboard')
            setformData({
              email: '',
              password: ''
            })
          })
      } else {
        alert("Invalid Credentials")
      }
    } catch (error) {
      console.error("Login error", error)
      alert("Something went wrong")
    }
  }




  return (
    <div className=' h-screen flex custom-bg'>
      <form className=' m-auto' onSubmit={handleLogin}>
        <div className='w-[718px] m-auto bg-white flex flex-col gap-[42px] rounded-[30px] p-5'>
          <div className='w-[690px] m-auto flex flex-col gap-[42px] px-[64px]'>
            <div>
              <h2 className='text-[48px] font-[600] text-center'>Log In</h2>
              <div className='flex flex-col gap-[24px]'>
                <div>
                  <p className='text-[#00000080] text-[24px] font-[400]'>Email</p>
                  <input
                    name='email'
                    className='mt-[22px] border w-full bg-[#6672EA33] pt-[10px] pb-[10px] pr-[32px] pl-[32px] rounded-[30px] focus:outline-none'
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <p className='text-[#00000080] text-[24px] font-[400]'>Password</p>
                  <input
                    name='password'
                    className='mt-[22px] border w-full bg-[#6672EA33] pt-[10px] pb-[10px] pr-[32px] pl-[32px] rounded-[30px] focus:outline-none'
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <button type='submit' className='w-full text-white rounded-[30px] bg-[#6672EA] py-[10px] px-[32px] text-[32px] font-[500]'>Log In</button>
          </div>
          <Link to='/signup' className='text-center text-[#6672EA]'>Don't have an account? <span className='underline'>Sign Up</span></Link>
        </div>
      </form>
    </div>
  )
}

export default Login
