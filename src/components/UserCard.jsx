import React from 'react'

const UserCard = ({ user }) => {
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
          {user?.firstName}. {user?.lastName}
        </h1>
        <p>Age :{user?.age}</p>
        <p>Gender: {user?.gender}</p>
        <p>About: {user?.about}</p>

        <div className="card-actions justify-center my-2">
          <button className="btn btn-primary bg-base-300">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
