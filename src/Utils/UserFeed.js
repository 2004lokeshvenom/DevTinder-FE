import { createSlice } from '@reduxjs/toolkit'

const FeedSlice = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload
    },
    removeUserFromFeed: (state, action) => {
      return state.filter((req) => req._id !== action.payload)
    },
  },
})

export const { addFeed, removeUserFromFeed } = FeedSlice.actions
export default FeedSlice.reducer
