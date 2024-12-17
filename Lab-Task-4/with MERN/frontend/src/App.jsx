import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import SingleProductView from './components/Dashboard/SingleProductView'

function App() {
  return (
    <div className=''>
      <Routes>

        {/* Reuirments for Lab Task 4 has been Applied in the Dashboard Components*/}
        {/* Sorting, Searching and  Pagination has been Applied There*/}
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard/:id' element={<SingleProductView />} />
      </Routes>
    </div>
  )
}

export default App