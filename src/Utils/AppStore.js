import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import UserFeed from "./UserFeed";
import ConnectionSlice from "./connectionSlice"
import RequestSlice from "./requests";

const AppStore=configureStore({
  reducer:{
    user: userReducer,
    feed: UserFeed,
    request:RequestSlice,
    connection:ConnectionSlice
  }
})

export default AppStore;