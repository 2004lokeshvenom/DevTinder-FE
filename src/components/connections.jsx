import React, { useEffect } from 'react'
import BASE_URL from '../Utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../Utils/connectionSlice'
import axios from 'axios'

const Connections = () => {
  const dispatch = useDispatch()
  const connections=useSelector(state=>state.connection)

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      })
      dispatch(addConnection(res.data.data))
    } catch (err) {
      console.error('Error fetching connections:', err)
    }
  }

  useEffect(() => {
    getConnections()
  }, [])

 return (
   <div className="p-6 bg-base-100 min-h-screen">
     <h2
       className="text-2xl mx-auto
    w-fit mb-5 btn btn-secondary bg-base-300 flex justify-center">
       Connections
     </h2>

     {connections && connections.length > 0 ? (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {connections.map((connection, index) => (
           <div key={index} className="bg-base-300 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
             <img src={connection.photoUrl} alt="imageOfPerson" className="w-full h-100 object-cover" />
             <div className="p-5">
               <h3 className="text-xl font-semibold">
                 {connection.firstName} {connection.lastName}
               </h3>
               <p className=" mt-1">
                 <span className="font-medium">Age:</span> {connection.age}
               </p>
               <p className="">
                 <span className="font-medium">Gender:</span> {connection.gender}
               </p>
               <p className="mt-2 text-sm leading-relaxed">
                 <span className="font-medium">About:</span> {connection.about}
               </p>
             </div>
           </div>
         ))}
       </div>
     ) : (
       <p className="text-center text-lg mt-8">No connections found.</p>
     )}
   </div>
 )

}

export default Connections
