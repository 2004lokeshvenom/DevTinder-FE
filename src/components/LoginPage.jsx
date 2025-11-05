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

  const handleLogin = async () => {
    if (!email || !password) {
      setErrMessage('Please enter both Email and Password')
      return
    }

    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password }, { withCredentials: true })
      console.log('Login successful:', res.data)
      dispatch(addUser(res.data))
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message)
      setErrMessage(err?.response?.data)
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="flex justify-center my-15">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <div className="fieldset-legend bg-base-200 border-base-300 flex justify-center text-xl my-0">
          <h1>Login</h1>
        </div>

        <label className="label">Email</label>
        <input type="email" value={email} className="input" onChange={(e) => setEmailId(e.target.value)} placeholder="Enter your email" />

        <label className="label">Password</label>
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            className="input w-full pr-16"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <button type="button" className="absolute right-0 top-0 text-sm px-3 py-2.5" onClick={() => setShowPass(!showPass)}>
            {showPass ? 'Hide' : 'Show'}
          </button>
        </div>
        <h1 className="text-red-500 text-sm my-1">{errMessage}</h1>
        <button className="btn btn-primary mt-1 w-full" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  )
}

export default LoginPage
