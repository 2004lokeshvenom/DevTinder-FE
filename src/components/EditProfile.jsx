import React, { useState } from 'react'
import BASE_URL from '../Utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'
import axios from 'axios'
import { addUser } from '../Utils/UserSlice'

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [age, setAge] = useState(user.age)
  const [gender, setGender] = useState(user.gender)
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
  const [about, setAbout] = useState(user.about)
  const [errMessage, setErrMessage] = useState('')
  const [toast, setToast] = useState(false)
  const dispatch = useDispatch()

  const saveProfile = async () => {
    try {
      const res = await axios.patch(BASE_URL + '/profile/edit', { firstName, lastName, age, gender, photoUrl, about }, { withCredentials: true })
      setErrMessage('')
      dispatch(addUser(res?.data?.data))
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 3000)
    } catch (err) {
      setErrMessage('ERROR :' + err.response.data)
    }
  }
  return (
    <div className="flex justify-center my-5">
      <div className="flex justify-center mx-10">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <div className="fieldset-legend bg-base-200 border-base-300 flex justify-center text-xl my-0">
            <h1>Edit Profile</h1>
          </div>

          <label className="label">first name</label>
          <input
            type="firstName"
            value={firstName}
            className="input"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />

          <label className="label">last name</label>
          <input
            type="lastName"
            value={lastName}
            className="input"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />

          <label className="label">Age</label>
          <input type="age" value={age} className="input" onChange={(e) => setAge(e.target.value)} placeholder="Enter your Age" />
          <label className="label">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="select select-bordered w-full">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label className="label">Photo Url</label>
          <input
            type="Photo Url"
            value={photoUrl}
            className="input"
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="Enter your photo url"
          />

          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea className="textarea h-24" placeholder="about" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
          </fieldset>
          <h1 className="text-red-500 text-sm my-1">{errMessage}</h1>
          <button className="btn btn-primary mt-1 w-full" onClick={saveProfile}>
            Save Profile
          </button>
        </fieldset>
      </div>
      <div>
        <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved Successfully</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditProfile
