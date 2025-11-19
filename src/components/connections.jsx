import React, { useEffect } from 'react'
import BASE_URL from '../Utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../Utils/connectionSlice'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Connections = () => {
  const dispatch = useDispatch()
  const connections = useSelector((state) => state.connection)

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      })
      dispatch(addConnection(res?.data?.data))
    } catch (err) {
      console.error('Error fetching connections:', err)
    }
  }

  useEffect(() => {
    getConnections()
  }, [])

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-base-100 min-h-screen">
      <h2 className="text-xl sm:text-2xl mx-auto w-fit mb-5 sm:mb-6 btn btn-secondary bg-base-300 flex justify-center px-4 sm:px-6">Connections</h2>

      {connections && connections.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {connections.map((connection, index) => (
            <div key={index} className="bg-base-300 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img
                src={connection.photoUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAdAfaOIwWKxOsmQ54IvUovtzIo7z-VNCPjQ&s'}
                alt="imageOfPerson"
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-semibold break-words mb-2">
                  {connection.firstName} {connection.lastName}
                </h3>
                <p className="text-sm sm:text-base mt-1">
                  <span className="font-medium">Age:</span> {connection.age}
                </p>
                <p className="text-sm sm:text-base">
                  <span className="font-medium">Gender:</span> {connection.gender}
                </p>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed break-words">
                  <span className="font-medium">About:</span> {connection.about}
                </p>
              </div>
              <Link to={"/chat/" + connection._id} className="m-4">
                <button className="btn btn-primary">Chat</button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-base sm:text-lg mt-8 text-base-content/70">No connections found.</p>
      )}
    </div>
  )
}

export default Connections
