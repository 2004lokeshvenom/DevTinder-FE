import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './Body'
import Login from './Login'
import Signup from './Signup'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<h1 className="flex items-center justify-center text-3xl font-bold">hello this is default case</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
