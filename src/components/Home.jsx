import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserCard from './UserCard'
import axios from 'axios'
import BASE_URL from '../Utils/constants'
import { addFeed } from '../Utils/UserFeed'

const Home = () => {
  const dispatch = useDispatch()
  const feed = useSelector((state) => state.feed)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get(BASE_URL + '/feed', { withCredentials: true })
        dispatch(addFeed(res?.data?.data))
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/login')
        }
      }
    }

    fetchFeed()
  }, [])

  if (!feed || feed.length <= 0)
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl mx-auto w-fit my-4 sm:my-5 btn btn-secondary bg-base-300 flex justify-center px-4 sm:px-6">Feed</h1>
        <h1 className="flex justify-center my-8 sm:my-10 text-base sm:text-lg text-base-content/70">No new Users found</h1>
      </div>
    )
  return (
    <div className="container mx-auto px-4 py-0 sm:pb-0">
      <h1 className="text-xl sm:text-2xl mx-auto w-fit my-4 sm:my-5 btn btn-secondary bg-base-300 flex justify-center px-4 sm:px-6">Feed</h1>
      <div className="flex justify-center my-4 sm:my-5">
        <UserCard user={feed[0]} />
      </div>
    </div>
  )
}

export default Home
