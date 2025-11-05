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

  if (!feed || feed.length <= 0)
    return (
      <>
        <h1
          className="text-2xl mx-auto
    w-fit my-5 btn btn-secondary bg-base-300 flex justify-center">
          Feed
        </h1>
        <h1 className="flex justify-center my-10">No new Users found</h1>
      </>
    )
  return (
    <>
      <h1
        className="text-2xl mx-auto
    w-fit my-5 btn btn-secondary bg-base-300 flex justify-center">
        Feed
      </h1>
      <div className="flex justify-center my-5">
        <UserCard user={feed[0]} />
      </div>
    </>
  )
}

export default Home
