import axios from 'axios'
import React, { useState } from 'react'
import BASE_URL from '../Utils/constants'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [about, setAbout] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [toast, setToast] = useState(false)
  const navigate=useNavigate();

  const handleSignup = async () => {
    try{
      const res = await axios.post(BASE_URL + '/signup',{firstName,lastName,email,password,photoUrl,age,gender,about},{withCredentials:true})
      navigate("/login")
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 3000)
    }
    catch(err){
      console.error('Signup error:', err)
      setErrMessage('ERROR :' + err.response.data)
    }
  }

  return (
    <div className="flex justify-center my-5">
      <div className="flex justify-center mx-10">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <div className="fieldset-legend bg-base-200 border-base-300 flex justify-center text-xl my-0">
            <h1>SignUp</h1>
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
          <label className="label">Email</label>
          <input type="email" value={email} className="input" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" />
          <label className="label">Password</label>
          <input type="text" value={password} className="input" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />

          <label className="label">Age</label>
          <input type="age" value={age} className="input" onChange={(e) => setAge(e.target.value)} placeholder="Enter your Age" />

          <label className="label">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="select select-bordered w-full">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label className="label">Photo Url</label>
          <input type="text" value={photoUrl} className="input" onChange={(e) => setPhotoUrl(e.target.value)} placeholder="Enter your photo url" />

          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea className="textarea h-24" placeholder="about" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
          </fieldset>
          <h1 className="text-red-500 text-sm my-1">{errMessage}</h1>
          <button className="btn btn-primary mt-1 w-full" onClick={handleSignup}>
            SignUp
          </button>
        </fieldset>
      </div>

      <div className="max-w-sm w-full bg-base-300 rounded-2xl shadow-md hover:shadow-xl overflow-hidden">
        <figure className="relative">
          <img
            src={photoUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAdAfaOIwWKxOsmQ54IvUovtzIo7z-VNCPjQ&s'}
            alt="Profile"
            className="w-full h-72 object-cover rounded-t-2xl"
          />
        </figure>

        <div className="p-5">
          <h2 className="text-xl font-semibold mb-2 py-2">
            Name : {firstName} {lastName}
          </h2>
          <div className="space-y-3">
            <h1>Age: {age}</h1>
            <h1>Gender: {gender}</h1>
            <div>
              <h1
                className="
                text-sm leading-relaxed
                overflow-auto
                break-words whitespace-pre-wrap
                
              ">
                About: {about}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>SignUp Successfull</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Signup
