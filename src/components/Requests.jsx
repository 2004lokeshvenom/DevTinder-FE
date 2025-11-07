import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../Utils/requests'
import BASE_URL from '../Utils/constants'
import axios from 'axios'

const Requests = () => {
  const dispatch = useDispatch()
  const requests = useSelector((state) => state.request)

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(BASE_URL + '/request/review/' + status + '/' + _id, {}, { withCredentials: true })
      dispatch(removeRequest(_id))
    } catch (err) {
      console.error('Error reviewing request:', err)
    }
  }

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests', {
        withCredentials: true,
      })
      dispatch(addRequests(res?.data?.data))
    } catch (err) {
      console.error('Error fetching requests:', err)
    }
  }

  useEffect(() => {
    getRequests()
  }, [])

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-base-100 min-h-screen">
      <h2 className="text-xl sm:text-2xl mx-auto w-fit mb-5 sm:mb-6 btn btn-secondary bg-base-300 flex justify-center px-4 sm:px-6">Requests</h2>

      {requests && requests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {requests.map((request, index) => (
            <div key={index} className="bg-base-300 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img
                src={request.fromUserId?.photoUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAdAfaOIwWKxOsmQ54IvUovtzIo7z-VNCPjQ&s'}
                alt="imageOfPerson"
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-semibold break-words mb-2">
                  {request.fromUserId?.firstName} {request.fromUserId?.lastName}
                </h3>
                <p className="text-sm sm:text-base mt-1">
                  <span className="font-medium">Age:</span> {request.fromUserId?.age}
                </p>
                <p className="text-sm sm:text-base">
                  <span className="font-medium">Gender:</span> {request.fromUserId?.gender}
                </p>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed break-words">
                  <span className="font-medium">About:</span> {request.fromUserId?.about}
                </p>
                <div className="card-actions justify-center my-3 sm:my-4 gap-2">
                  <button
                    className="btn btn-primary btn-outline text-xs sm:text-sm flex-1 sm:flex-none"
                    onClick={() => reviewRequest('rejected', request._id)}>
                    Reject
                  </button>
                  <button className="btn btn-primary text-xs sm:text-sm flex-1 sm:flex-none" onClick={() => reviewRequest('accepted', request._id)}>
                    Accept
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-base sm:text-lg mt-8 text-base-content/70">No requests found.</p>
      )}
    </div>
  )
}

export default Requests
