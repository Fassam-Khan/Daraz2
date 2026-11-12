import React from 'react'
import { InputRegister } from '@/components/register/InputRegister'
import { Label } from '@/components/ui/label'
import "@/app/globals.css"


export const metadata = {
        title: "Create Account | Nazar Brothers",
        description: "Learn more about our company and mission.",
      };

const page = () => {

    
    return (
        <div>
            {/* page title heading  */}
            <div className='bg-[#757575] flex justify-center items-center text-white font-semibold h-30'>
                <p className="text-2xl">Register</p>

            </div>

            {/* main content  */}
            <div className="flex justify-center items-center mt-10">
               
                    <InputRegister  />
               

            </div>




        </div>
    )
}

export default page
