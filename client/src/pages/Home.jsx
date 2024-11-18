import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
   <div    
       className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
        Rescue Rehabilitate Rehome 
        <br />
        </h1>
        <h2 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
        Together We Can Make Difference 
        <br />
          
        </h2>
        <div className='text-gray-400 text-xs sm:text-sm'>
          introooooooooooooooooooooooooooooooooooooooooooo
          <br />
      like a sologaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>
  )
}
