import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify'

const Login = () => {

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)


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


  // HANDLE LOGIN 
  const handleLogin = async (e) => {
    e.preventDefault();

    // CHECK IF ALL FIELDS HAVE BEEN FILLED 
    if (!email || !password) {
      toast.error("Please fill all fields")
      return;
    }

    // FIND THE INPUTED USER AND PASSWORD FROM THE USER ARRAY IN THE DB  
    try {
      const res = await axios.get('http://localhost:5000/users');
      const user = res.data.find(
        (u) => u.email === email && u.password === password
      );

      setLoading(true)
      // IF THERE IS A USER, PUSH TO LOGGEDINUSER ARRAY, SET LOCALSTORAGE AND NAVIGATE TO DASHBAORD 
      if (user) {
        console.log(user);
        await axios.post('http://localhost:5000/loggedInUser', user)
          .then((res) => {
            localStorage.setItem('loggedInUser', JSON.stringify(res.data));
            toast.success("Login Successful")
            setTimeout(() => {
              navigate('/dashboard')
            }, 3000);
            setEmail("")
            setPassword("")
          })
      } else {
        toast.error("Invalid Credentials")
      }
    } catch (error) {
      console.error("Login error", error)
      toast.error("Error logging in")
    }
  }




  return (
    <div className=' h-screen md:flex custom-bg'>
      <form className=' md:w-[690px] md:m-auto' onSubmit={handleLogin}>
        <div className='w-full md:w-[718px] md:m-auto bg-white space-y-8 rounded-[30px] p-5'>
          <div className='md:w-[690px] md:m-auto space-y-[20px] md:px-[64px]'>

            <h2 className='text-[48px] font-[600] text-center'>Log In</h2>

            {/* EMAIL           */}
            <div>
              <p className='text-[#00000080] text-[24px] font-[400]'>Email</p>
              <input
                name='email'
                className='mt-[22px] border w-full bg-[#6672EA33] pt-[10px] pb-[10px] pr-[32px] pl-[32px] rounded-[30px] focus:outline-none focus:ring-2'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD  */}
            <div>
              <p className='text-[#00000080] text-[24px] font-[400]'>Password</p>
              <div className="relative ">
                <input
                  name='password'
                  className='mt-[22px] border w-full bg-[#6672EA33] pt-[10px] pb-[10px] pr-[32px] pl-[32px] rounded-[30px] focus:outline-none focus:ring-2'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute mt-[10px] right-[20px] top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            {/* LOGIN BUTTON   */}
            <div className='flex justify-center'>
            <button type='submit' disabled={loading} className={`md:w-full text-white md:rounded-[30px] bg-[#6672EA] py-[10px] px-[32px] md:text-[32px] font-[500] ${loading && "opacity-50 cursor-not-allowed"}`}>{loading ? "Logging In..." : "Login"}</button>
            </div>
          </div>
          <Link to='/signup' className='text-center px-[64px] flex justify-center text-[#6672EA]'>Don't have an account? <span className='underline'>Sign Up</span></Link>
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

export default Login
