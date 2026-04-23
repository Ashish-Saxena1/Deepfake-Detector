import React from 'react'
import {  Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/homepage'
import AnalysisPage from './pages/AnalysisPage'

const App = () => {
  return (
    <div>
      <Routes>
      
      <Route path='/' element={<Homepage/>}/>
      <Route path='/analyzer' element={<AnalysisPage/>}/>
      
      
      
    </Routes>
    </div>
  )
}

export default App
