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
  console.log(feed)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get(BASE_URL + '/feed', { withCredentials: true })
        dispatch(addFeed(res?.data?.data))
      } catch (err) {
        console.log('Feed is not loading: ' + err.message)
        if (err.response?.status === 401) {
          navigate('/login')
        }
      }
    }

    fetchFeed()
  }, [])

  return (
    <div className="flex justify-center my-10">
      {feed && feed.length > 0 ? (
        <UserCard user={feed[1]} />
      ) : (
        <div>
          <p className="text-center mt-4">No feed available</p>
        </div>
      )}
    </div>
  )
}

export default Home
