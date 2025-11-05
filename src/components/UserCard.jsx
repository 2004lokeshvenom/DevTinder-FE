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
      console.log('ERROR' + err.message)
    }
  }

  if (!user) {
    return (
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body items-center text-center">
          <h2 className="card-title">No User Found</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={user?.photoUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAdAfaOIwWKxOsmQ54IvUovtzIo7z-VNCPjQ&s'}
          alt="Shoes"
          className="rounded-xl object-cover h-80 my-7"
        />
      </figure>
      <div className="card-body py-2">
        <h1 className="card-title text-2xl">
          Name: {user?.firstName} {user?.lastName}
        </h1>
        <p>Age :{user?.age}</p>
        <p>Gender: {user?.gender}</p>
        <p>About: {user?.about}</p>

        <div className="card-actions justify-center my-2">
          <button
            className="btn btn-primary bg-base-300"
            onClick={() => {
              handleRequest('ignored', user?._id)
            }}>
            Ignore
          </button>
          <button
            className="btn btn-primary"
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
