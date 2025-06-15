import { useState } from 'react'
import './App.css'
import Header from './Components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='pt-10 h-max'>
      <Header />

      <div className='pt-10 px-30'>
        {/* Content 1 */}
        <div className='flex w-full'>
          {/* Content 1 Left Part */}
          <div className='w-full'>
            <p>as</p>
          </div>

          {/* Content 1 Right Part */}
          <div className='w-full'>
            <img src="../public/auction.avif" alt="auction" className='w-full h-125' />
          </div>
        </div>
      </div>

      </div>
    </>
  )
}

export default App
