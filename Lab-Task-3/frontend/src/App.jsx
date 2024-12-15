import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import SingleProductView from './components/Dashboard/SingleProductView'

function App() {
  return (
    <div className=''>
      <Routes>

        {/* These Admin Dashboard routes will be Protected After Implementing Authentication*/}
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard/:id' element={<SingleProductView />} />
      </Routes>
    </div>
  )
}

export default App