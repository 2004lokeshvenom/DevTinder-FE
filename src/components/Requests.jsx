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
      console.log('successfully reviewes request')
    } catch (err) {
      console.log('error while reviewing request')
    }
  }

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests', {
        withCredentials: true,
      })
      dispatch(addRequests(res.data.data))
    } catch (err) {
      console.error('Error fetching requests:', err)
    }
  }

  useEffect(() => {
    getRequests()
  }, [])

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h2
        className="text-2xl mx-auto
    w-fit mb-5 btn btn-secondary bg-base-300 flex justify-center">
        Requests
      </h2>

      {requests && requests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request, index) => (
            <div key={index} className="bg-base-300 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img src={request.fromUserId.photoUrl} alt="imageOfPerson" className="w-full h-56 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold">
                  {request.firstName} {request.fromUserId.lastName}
                </h3>
                <p className=" mt-1">
                  <span className="font-medium">Age:</span> {request.fromUserId.age}
                </p>
                <p className="">
                  <span className="font-medium">Gender:</span> {request.fromUserId.gender}
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  <span className="font-medium">About:</span> {request.fromUserId.about}
                </p>
                <div className="card-actions justify-center my-2">
                  <button className="btn btn-primary bg-base-300" onClick={() => reviewRequest('rejected', request._id)}>
                    Fuck off!
                  </button>
                  <button className="btn btn-primary" onClick={() => reviewRequest('accepted', request._id)}>
                    Accept it!
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg mt-8">No requests found.</p>
      )}
    </div>
  )
}

export default Requests
