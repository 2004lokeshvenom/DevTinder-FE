import React, { useState } from 'react'
import BASE_URL from '../Utils/constants'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addUser } from '../Utils/UserSlice'

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [age, setAge] = useState(user?.age || '')
  const [gender, setGender] = useState(user?.gender || '')
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '')
  const [about, setAbout] = useState(user?.about || '')
  const [errMessage, setErrMessage] = useState('')
  const [toast, setToast] = useState(false)
  const dispatch = useDispatch()

  const isValidUrl = (urlString) => {
    if (!urlString || !urlString.trim()) return true
    try {
      const url = new URL(urlString.trim())
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
      return false
    }
  }

  const handlePhotoUrlChange = (e) => {
    const newUrl = e.target.value
    setPhotoUrl(newUrl)
    if (errMessage && errMessage.includes('Photo URL')) {
      if (isValidUrl(newUrl)) {
        setErrMessage('')
      }
    }
  }

  const saveProfile = async () => {
    setErrMessage('')

    if (photoUrl.trim() && !isValidUrl(photoUrl)) {
      setErrMessage('Please enter a valid Photo URL (must start with http:// or https://)')
      return
    }

    try {
      const defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAdAfaOIwWKxOsmQ54IvUovtzIo7z-VNCPjQ&s'
      const finalPhotoUrl = photoUrl.trim() || defaultImageUrl

      const res = await axios.patch(
        BASE_URL + '/profile/edit',
        { firstName, lastName, age, gender, photoUrl: finalPhotoUrl, about },
        { withCredentials: true }
      )
      setErrMessage('')
      dispatch(addUser(res?.data?.data))
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 3000)
    } catch (err) {
      const errorMsg = err?.response?.data
      setErrMessage(
        'ERROR : ' + (typeof errorMsg === 'string' ? errorMsg : errorMsg?.message || err?.message || 'Profile update failed. Please try again.')
      )
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div className="bg-base-100 rounded-2xl shadow-2xl p-6 sm:p-8 border border-base-300">
                <div className="text-center mb-6">
                  <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Edit Profile</h1>
                  <p className="text-base-content/70 text-sm">Update your information and preferences</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label py-2">
                        <span className="label-text font-medium text-sm">First Name</span>
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        className="input input-bordered w-full focus:input-primary transition-colors"
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="label py-2">
                        <span className="label-text font-medium text-sm">Last Name</span>
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        className="input input-bordered w-full focus:input-primary transition-colors"
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label py-2">
                        <span className="label-text font-medium text-sm">Age</span>
                      </label>
                      <input
                        type="number"
                        value={age}
                        className="input input-bordered w-full focus:input-primary transition-colors"
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="25"
                        min="18"
                      />
                    </div>
                    <div>
                      <label className="label py-2">
                        <span className="label-text font-medium text-sm">Gender</span>
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="select select-bordered w-full focus:select-primary transition-colors">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label py-2">
                      <span className="label-text font-medium text-sm">Photo URL</span>
                    </label>
                    <input
                      type="url"
                      value={photoUrl}
                      className="input input-bordered w-full focus:input-primary transition-colors"
                      onChange={handlePhotoUrlChange}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>

                  <div>
                    <label className="label py-2">
                      <span className="label-text font-medium text-sm">About</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered w-full h-24 focus:textarea-primary transition-colors resize-none"
                      placeholder="Tell us about yourself..."
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}></textarea>
                  </div>

                  {errMessage && (
                    <div className="alert alert-error py-2">
                      <span className="text-sm">{errMessage}</span>
                    </div>
                  )}

                  <button
                    className="btn btn-primary w-full mt-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                    onClick={saveProfile}>
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="w-full max-w-sm">
              <div className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden border border-base-300 transform transition-all hover:scale-[1.02]">
                <figure className="relative h-80 bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img
                    src={photoUrl || 'https://i.pinimg.com/736x/40/f8/d9/40f8d909096a6dd04ad2e2a8598aa420.jpg'}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://i.pinimg.com/736x/40/f8/d9/40f8d909096a6dd04ad2e2a8598aa420.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </figure>

                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-1">
                    {firstName} {lastName}
                  </h2>
                  <div className="divider my-3"></div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base-content/60 text-sm font-medium">Age:</span>
                      <span className="text-base-content font-semibold">{age || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base-content/60 text-sm font-medium">Gender:</span>
                      <span className="text-base-content font-semibold">{gender || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-base-content/60 text-sm font-medium block mb-1">About:</span>
                      <p className="text-base-content text-sm leading-relaxed break-words whitespace-pre-wrap">
                        {about || 'No description provided'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-lg">
            <span>Profile Saved Successfully!</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditProfile
