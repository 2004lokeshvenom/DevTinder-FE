import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  return (
    <div>
      {user ? (
        <>
          <div>Home welcome email is {user?.data?.email}</div>
          <div>
            Home welcome full name is {user?.data?.firstName} {user?.data?.lastName}
          </div>
          <div>Home welcome age is {user?.data?.age}</div>
        </>
      ) : (
        <>
          <div>please login first to home here</div>
          <button onClick={() => navigate('/login')} className="bg-base-200 border-base-300 rounded-box border p-4">Login</button>
        </>
      )}
    </div>
  )
}

export default Home
