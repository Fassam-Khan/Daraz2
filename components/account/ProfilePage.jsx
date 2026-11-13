"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { ArrowRight, MapPin } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'
import { db } from '@/lib/firebase'

import { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";



const ProfilePage = () => {
    const { id } = useParams()
    const [UserData, setUserData] = useState({})


    useEffect(() => {

        const getUser = async () => {
            try{
                const docRef = doc(db, "users", id);
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {
                    setUserData(docSnap.data())
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }

            }catch(error){
                console.log(erro)

            }
         



        }

        getUser()

    }, [])





    const logOutUser = async () => {
        const auth = getAuth()

        try {
            const res = await signOut(auth)
            toast.warning("Logout successfully")
            console.log(res)

        } catch (error) {
            console.log(error)

        }

    }

    return (
        <div className=' md:w-[700px] w-full md:m-auto'>

            <div className=''>
                {/* userName  */}
                <div className='flex justify-between'>
                    <p>{UserData.firstName} {UserData.lastName}</p>
                    <button className='cursor-pointer border text-blue-500 hover:text-blue-700 rounded-md px-2 py-0.5'>Edit</button>
                </div>

                {/* Email  */}

                <div className='flex flex-wrap justify-between mt-6 border  rounded-lg shadow-xl px-4 py-3  items-center'>
                    <p className='text-gray-400'>Email</p>
                    <p className='text-black text-sm'>{UserData.email}</p>

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
                            <MapPin />

                        </div>
                        <div className='flex flex-col items-start'>
                            <p className='text-sm'>Muhammafassam</p>
                            <p className='text-[12px]'>khusf </p>
                        </div>
                    </div>
                    <p className='text-black'><ArrowRight /></p>

                </button>



                {/* SingOut  */}

                <div className='mt-10'>
                    <button className='cursor-pointer border text-blue-500 hover:text-blue-700 rounded-md px-2 py-0.5' onClick={logOutUser}>Logout</button>


                </div>
            </div>

        </div>
    )
}

export default ProfilePage
