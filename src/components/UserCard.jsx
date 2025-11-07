import axios from 'axios'
import React from 'react'
import BASE_URL from '../Utils/constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../Utils/UserFeed'

const UserCard = ({ user }) => {
  const dispatch = useDispatch()

  const handleRequest = async (status, _id) => {
    try {
      const res = await axios.post(BASE_URL + '/request/send/' + status + '/' + _id, {}, { withCredentials: true })
      dispatch(removeUserFromFeed(_id))
    } catch (err) {
      console.error('Error sending request:', err)
    }
  }

  if (!user) {
    return (
      <div className="card bg-base-100 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl shadow-lg">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-base sm:text-lg">No User Found</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-base-300 w-full max-w-sm sm:max-w-md md:max-w-lg shadow-lg">
      <figure className="px-4 pt-0 sm:px-4 sm:pt-0">
        <img
          src={user?.photoUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAdAfaOIwWKxOsmQ54IvUovtzIo7z-VNCPjQ&s'}
          alt="User profile"
          className="rounded-xl object-cover w-full h-64 sm:h-72 md:h-80 my-4 sm:my-6"
        />
      </figure>
      <div className="card-body py-3 sm:py-4 px-4 sm:px-6">
        <h1 className="card-title text-lg sm:text-xl md:text-2xl break-words">
          Name: {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-sm sm:text-base">Age: {user?.age}</p>
        <p className="text-sm sm:text-base">Gender: {user?.gender}</p>
        <p className="text-sm sm:text-base break-words">About: {user?.about}</p>

        <div className="card-actions justify-center my-3 sm:my-4 gap-2 sm:gap-3">
          <button
            className="btn btn-primary btn-outline text-xs sm:text-sm md:text-base flex-1 sm:flex-none"
            onClick={() => {
              handleRequest('ignored', user?._id)
            }}>
            Ignore
          </button>
          <button
            className="btn btn-primary text-xs sm:text-sm md:text-base flex-1 sm:flex-none"
            onClick={() => {
              handleRequest('interested', user?._id)
            }}>
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
