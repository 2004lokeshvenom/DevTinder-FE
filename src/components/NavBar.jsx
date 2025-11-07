import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeUser } from '../Utils/UserSlice'
import BASE_URL from '../Utils/constants'
import axios from 'axios'

const NavBar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlelogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true })
      dispatch(removeUser())
      navigate('/login')
    } catch (err) {
      console.error('Error logging out:', err)
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-sm sm:text-base md:text-xl px-2 sm:px-4">
          <span className="hidden sm:inline">𝒟𝑒𝓋𝒯𝒾𝓃𝒹𝑒𝓇</span>
          <span className="sm:hidden">𝒟𝑒𝓋𝒯𝒾𝓃𝒹𝑒𝓇</span>
          <span className="xs:inline sm:inline"> ❤️ ❤️ ❤️</span>
        </Link>
      </div>
      {user && (
        <div className="flex items-center gap-2 sm:gap-4">
          <h1 className="text-xs sm:text-sm font-semibold truncate max-w-[100px] sm:max-w-[150px]">Welcome, {user?.data?.lastName}</h1>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                <img alt="User profile" className="rounded-full w-full h-full object-cover" src={user?.data?.photoUrl} />
              </div>
            </div>
            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-48 sm:w-52 p-2 shadow-lg">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handlelogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar
