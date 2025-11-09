import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addUser } from '../Utils/UserSlice'
import BASE_URL from '../Utils/constants'

const Body = () => {
  const userData = useSelector((store) => store.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchUser = async () => {
    try {
      if (userData) return
      const user = await axios.get(BASE_URL + '/profile/view', { withCredentials: true })
      dispatch(addUser(user.data))
    } catch (err) {
      navigate('/login')
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body
