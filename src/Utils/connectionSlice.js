import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice=createSlice({
  name:"connection",
  initialState:null,
  reducers:{
    addConnection:(state,action)=>{
      return action.payload
    },
    removeConnection:()=>{
      return null
    }
  }
})

export default ConnectionSlice.reducer
export const {addConnection,removeConnection}= ConnectionSlice.actions