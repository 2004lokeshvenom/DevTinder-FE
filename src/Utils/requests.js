import { createSlice } from '@reduxjs/toolkit'

const RequestSlice = createSlice({
  name: 'request',
  initialState:null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload
    },
    removeRequest: (state, action) => {
      if (!state || !Array.isArray(state)) return state
      return state.filter((req) => req._id !== action.payload)
    },
  },
})

export const { addRequests, removeRequest } = RequestSlice.actions
export default RequestSlice.reducer
