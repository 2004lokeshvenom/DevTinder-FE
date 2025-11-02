import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './components/Body'
import Signup from './components/Signup'
import LoginPage from './components/LoginPage'
import AppStore from './Utils/AppStore'
import { Provider } from 'react-redux'
import Home from './components/Home'
import Profile from './components/Profile'

const App = () => {
  return (
    <Provider store={AppStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
