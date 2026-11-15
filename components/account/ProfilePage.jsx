"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { ArrowRight, MapPin } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'
import { db } from '@/lib/firebase'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import { doc, getDoc , collection} from "firebase/firestore";
import { EditInfo } from './EditInfo'
import { AddressAdd } from './AddressAdd'
import { getDocs } from 'firebase/firestore'



const ProfilePage = () => {
    const { id } = useParams()
    const [UserData, setUserData] = useState({})
    const [IsEditInfo, setIsEditInfo] = useState(false)
    const [AddAdress, setAddAdress] = useState(false)
    const [Address, setAddress] = useState([])



    useEffect(() => {

        const getUser = async () => {
            try {
                const docRef = doc(db, "users", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data())
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }

            } catch (error) {
                console.log(error)

            }




        }

        getUser()

    }, [IsEditInfo])

    useEffect(() => {
        const getAddresses = async () => {
            try {
                const addressRef = collection(
                    db,
                    "users",
                    id,
                    "addresses"
                );
    
                const snapshot = await getDocs(addressRef);
    
                const addresses = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
    
                setAddress(addresses);
            } catch (error) {
                console.log("Error getting addresses:", error);
            }
        };
    
        if (id) {
            getAddresses();
        }
    
    }, [id, AddAdress]);





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
                    <button className='cursor-pointer border text-blue-500 hover:text-blue-700 rounded-md px-2 py-0.5' onClick={() => setIsEditInfo(true)}>Edit</button>

                </div>






                {/* Email  */}

                <div className='flex flex-wrap justify-between mt-6 border  rounded-lg shadow-xl px-4 py-3  items-center'>
                    <p className='text-gray-400'>Email</p>
                    <p className='text-black text-sm'>{UserData.email}</p>

                </div>

                {/* addres  */}
                <div className='flex justify-between mt-10'>
                    <p>Addresses</p>
                    <button className='cursor-pointer border text-blue-500 hover:text-blue-700 rounded-md px-2 py-0.5' onClick={() => setAddAdress(true)}>Add</button>
                </div>

                {/* Email  */}

                {Address.length > 0 ? (
    Address.map((e) => (
        <button
            key={e.id}
            className="flex justify-between mt-6 border w-full rounded-lg shadow-xl px-4 py-3 items-center"
        >
            <div className="flex gap-4">
                <div className="w-6 h-6 p-1 bg-gray-300 rounded-md flex justify-center items-center">
                    <MapPin />
                </div>

                <div className="flex flex-col items-start">
                    <p className="text-sm">
                        {e.firstName} {e.lastName}
                    </p>

                    <p className="text-xs text-gray-500">
                        {e.address}
                    </p>

                    <p className="text-xs text-gray-500">
                        {e.city}, {e.country}
                    </p>
                </div>
            </div>

            <ArrowRight />
        </button>
    ))
) : (
    <button className="flex justify-between mt-6 border w-full rounded-lg shadow-xl px-4 py-3 items-center">
        <div className="flex gap-4">
            <div className="w-6 h-6 p-1 bg-gray-300 rounded-md flex justify-center items-center">
                <MapPin />
            </div>

            <div className="flex flex-col items-start">
                <p className="text-sm">No Address Added</p>
            </div>
        </div>

        <ArrowRight />
    </button>
)}



                {/* SingOut  */}

                <div className='mt-10'>
                    <button className='cursor-pointer border text-blue-500 hover:text-blue-700 rounded-md px-2 py-0.5' onClick={logOutUser}>Logout</button>


                </div>
            </div>



            {IsEditInfo && (
                <EditInfo
                    User={UserData}
                    open={IsEditInfo}
                    setOpen={setIsEditInfo}
                    userid={id}
                />
            )}


            {AddAdress && (
                <AddressAdd User={UserData}
                    open={AddAdress}
                    setOpen={setAddAdress}
                    userid={id} />
            )}








        </div>
    )
}

export default ProfilePage
