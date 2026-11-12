import React from 'react'
import { Label } from '@/components/ui/label'
import "@/app/globals.css"
import { InputLogin } from '@/components/login/InputLogin';


export const metadata = {
        title: "Login | Nazar Brothers",
        description: "Learn more about our company and mission.",
      };

const page = () => {

    
    return (
        <div>
            {/* page title heading  */}
            <div className='bg-[#757575] flex justify-center items-center text-white font-semibold h-30'>
                <p className="text-2xl">Login</p>

            </div>

            {/* main content  */}
            <div className="flex justify-center items-center mt-10">
                <InputLogin/>
               

            </div>




        </div>
    )
}

export default page
