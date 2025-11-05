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

  const handlelogout = async() => {
    try {
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
      dispatch(removeUser())
      navigate('/login')
    } catch (err) {
      console.log('logout failed' + err)
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          𝒟𝑒𝓋𝒯𝒾𝓃𝒹𝑒𝓇 ❤️ ❤️ ❤️{' '}
        </Link>
      </div>
      {user && <h1 className="text-sm font-semibold mb-1 px-3">Welcome, {user?.data?.lastName}</h1>}
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full flex flex-col items-center text-center">
              {user && (
                <>
                  <img alt="User profile" className="rounded-full w-10 h-10" src={user?.data?.photoUrl} />
                </>
              )}
            </div>
          </div>
          <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections" className="h-8 flex">
                Connections
              </Link>
            </li>
            <li>
              <Link to="/requests" className="h-8 flex">
                Requests
              </Link>
            </li>
            <li>
              <a onClick={handlelogout} className="h-8 flex">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar
