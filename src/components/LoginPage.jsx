import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../Utils/UserSlice'
import { useNavigate } from 'react-router-dom'
import BASE_URL from '../Utils/constants'

const LoginPage = () => {
  const [email, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [errMessage, setErrMessage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const goToSignup = () => {
    navigate('/signup')
  }
  const handleLogin = async () => {
    if (!email || !password) {
      setErrMessage('Please enter both Email and Password')
      return
    }

    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password }, { withCredentials: true })
      dispatch(addUser(res.data))
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message)
      const errorMsg = err?.response?.data
      setErrMessage(typeof errorMsg === 'string' ? errorMsg : errorMsg?.message || err?.message || 'Login failed. Please try again.')
    }
  }

  useEffect(() => {
    if (user?.data) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] my-0 sm:my-0 px-4">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-xs sm:max-w-sm border p-4 sm:p-6">
        <div className="fieldset-legend bg-base-200 border-base-300 flex justify-center text-lg sm:text-xl my-0">
          <h1>Login</h1>
        </div>

        <label className="label text-sm sm:text-base">Email</label>
        <input
          type="email"
          value={email}
          className="input input-bordered w-full text-sm sm:text-base"
          onChange={(e) => setEmailId(e.target.value)}
          placeholder="Enter your email"
        />

        <label className="label text-sm sm:text-base">Password</label>
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            className="input input-bordered w-full pr-16 sm:pr-20 text-sm sm:text-base"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute right-0 top-0 text-xs sm:text-sm px-2 sm:px-3 py-2.5 sm:py-3"
            onClick={() => setShowPass(!showPass)}>
            {showPass ? 'Hide' : 'Show'}
          </button>
        </div>
        <h1 className="text-red-500 text-xs sm:text-sm my-1 min-h-[20px]">{errMessage}</h1>
        <button className="btn btn-primary mt-2 sm:mt-3 w-full text-sm sm:text-base" onClick={handleLogin}>
          Login
        </button>
        <button onClick={goToSignup} className="btn btn-outline mt-2 sm:mt-3 w-full text-sm sm:text-base">
          Signup
        </button>
      </fieldset>
    </div>
  )
}

export default LoginPage
