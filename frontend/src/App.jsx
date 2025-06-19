import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Button from './Components/Button'
import Card from './Components/Card.jsx'

function App() {

  return (

      <div className='flex flex-col pt-10 h-max'>
      <Header />

      <div className='flex flex-col py-10 px-30'>

        {/* Content 1 */}
        <div className='flex w-full items-center py-10'>
          {/* Content 1 Left Part */}
          <div className='flex flex-col w-full'>

            {/* Tag Line */}
            <h3 className='font-bold text-3xl'>Secure <span className='text-purple-500 text-4xl font-extrabold'>Bidding</span>, Smart <span className='text-purple-500 text-4xl font-extrabold'>Winning</span></h3>
            <br />

            {/* Buy and Sell Line */}
            <h1 className='text-6xl font-bold'>Buy and Sell <br />
            <span className='text-purple-500'>Bid of</span><br />
            Your Choice!</h1><br /> <br />

            <div className='flex text-purple-500 space-x-5'>
              <Button hrefLink='#buy' btnName='Buy' colorName='purple'/>
              <Button hrefLink='#sell' btnName='Sell' colorName='purple'  />
            </div>
          </div>

          {/* Content 1 Right Part */}
          <div className='w-full'>
            <img src="../public/auction.webp" alt="auction" className='w-full h-125' />
          </div>
        </div>
        {/* Content 1 */}


        {/* Content 2 */}
          <div className="w-full grid grid-flow-col gap-20 py-10">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        {/* Content 2 */}

        {/* Content 3 */}
        <div className='py-10 flex w-full items-center'>
          {/* Content 3 Left Part */}
          <div className='flex flex-col w-full'>

            {/* Tag Line */}
            <h3 className='font-bold text-3xl'>Bid <span className='text-purple-500 text-4xl font-extrabold'>With</span>, Us!</h3>
            <br />

            {/* Buy and Sell Line */}
            <h1 className='text-6xl font-bold'>Successfully launch<br />
            <span className='text-purple-500'>your best </span><br />
            Biddd!!!</h1><br /> <br />
            
            <div className='w-full grid gap-6'>
            <div className='w-full grid grid-flow-col gap-1'>
              <div className='flex items-center'>
                <div className='rounded-full bg-gray-500 w-20 h-20'></div>  
                <div className=''>Hay <br />Hay</div>  
              </div>

              <div className='flex items-center'>
                <div className='rounded-full bg-gray-500 w-20 h-20'></div>  
                <div className=''>Hay <br />Hay</div>  
              </div>
            </div>
            
            <div className='w-full'>
              <div className='flex items-center'>
                <div className='rounded-full bg-gray-500 w-20 h-20'></div>  
                <div className=''>Hay <br />Hay</div>  
              </div>
            </div>
            </div>

          </div>

          {/* Content 3 Right Part */}
          <div className='w-full flex justify-end'>
            <div className='flex w-100 h-125 bg-gray-500 rounded-2xl'>

            </div>
          </div>
        </div>
        {/* Content 3 */}

        {/* Content 4 */}
          <div className='py-10 w-full flex flex-col items-center'>
            <div className='text-3xl font-bold'>Bid <span className='text-violet-500'>timeline</span></div>
            <div className='text-4xl font-extrabold'>We can enter at any point or help you all the </div><div className='text-4xl font-extrabold'> way through the development cycle.</div>
          </div>
        {/* Content 4 */}
        
      </div>

      </div>

  )
}

export default App
