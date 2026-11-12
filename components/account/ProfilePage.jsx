"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { ArrowRight, MapPin } from 'lucide-react'

const ProfilePage = () => {
  return (
    <div className='border w-[700px] m-auto'>

        <div className=''>
            {/* userName  */}
            <div className='flex justify-between'>
                <p>Muhammad Fassam</p>
                <button className='cursor-pointer border text-blue-500 hover:text-blue-700 rounded-md px-2 py-0.5'>Edit</button>
            </div>

            {/* Email  */}

            <div className='flex justify-between mt-6 border  rounded-lg shadow-xl px-4 py-3  items-center'>
                <p className='text-gray-400'>Email</p>
                <p className='text-black'>muhamma@gmail.co</p>

            </div>

                {/* addres  */}
                <div className='flex justify-between mt-10'>
                <p>Addresses</p>
                <button className='cursor-pointer border text-blue-500 hover:text-blue-700 rounded-md px-2 py-0.5'>Add</button>
            </div>

            {/* Email  */}

            <button className='flex justify-between mt-6 border w-full  rounded-lg shadow-xl px-4 py-3  items-center'>
                <div className='flex gap-4'>
                    <div className='w-6 h-6 p-1 bg-gray-300 rounded-md flex justify-center items-center'>
                        <MapPin/>

                    </div>
                    <div className='flex flex-col items-start'>
                        <p className='text-sm'>Muhammafassam</p>
                        <p className='text-[12px]'>khusf </p>
                    </div>
                </div>
                <p className='text-black'><ArrowRight/></p>

            </button>



            {/* SingOut  */}

            <div className='mt-10'>
            <button className='cursor-pointer border text-blue-500 hover:text-blue-700 rounded-md px-2 py-0.5'>Logout</button>


            </div>
        </div>
      
    </div>
  )
}

export default ProfilePage
