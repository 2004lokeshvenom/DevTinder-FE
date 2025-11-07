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
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      const defaultImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAdAfaOIwWKxOsmQ54IvUovtzIo7z-VNCPjQ&s'
      const finalPhotoUrl = photoUrl.trim() || defaultImageUrl

      const res = await axios.post(
        BASE_URL + '/signup',
        { firstName, lastName, email, password, photoUrl: finalPhotoUrl, age, gender, about },
        { withCredentials: true }
      )
      navigate('/login')
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 3000)
    } catch (err) {
      console.error('Signup error:', err)
      const errorMsg = err?.response?.data
      setErrMessage('ERROR : ' + (typeof errorMsg === 'string' ? errorMsg : errorMsg?.message || err?.message || 'Signup failed. Please try again.'))
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
                  <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Create Account</h1>
                  <p className="text-base-content/70 text-sm">Join DevTinder and find your perfect match</p>
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

                  <div>
                    <label className="label py-2">
                      <span className="label-text font-medium text-sm">Email</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      className="input input-bordered w-full focus:input-primary transition-colors"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label className="label py-2">
                      <span className="label-text font-medium text-sm">Password</span>
                    </label>
                    <input
                      type="password"
                      value={password}
                      className="input input-bordered w-full focus:input-primary transition-colors"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
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
                      onChange={(e) => setPhotoUrl(e.target.value)}
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
                    onClick={handleSignup}>
                    Sign Up
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm text-base-content/70">
                      Already have an account?{' '}
                      <button onClick={() => navigate('/login')} className="link link-primary font-medium">
                        Login
                      </button>
                    </p>
                  </div>
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
                      e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAdAfaOIwWKxOsmQ54IvUovtzIo7z-VNCPjQ&s'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </figure>

                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-1">
                    {firstName || 'First'} {lastName || 'Last'}
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
            <span>SignUp Successful! Redirecting to login...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Signup
