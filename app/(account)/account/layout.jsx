"use client"
import '@/app/globals.css'
import { Poppins } from "next/font/google";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';






const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
    display: "swap",
});

export default function AccountLayout({ children }) {

    const router = useRouter()

    const {user, loading} = useSelector((state)=> state.auth)

    if(loading){
        return <p>Loading..</p>
    }

      if (!user) {
    return  router.push('/account/login')
  }

  
 

    

    




    return (
        <div className='font-poppins  text-slate-900  '>
            <div className='max-w-[1200px] m-auto px-4'>
                <header className=' md: flex justify-between  items-center h-15 '>
                    {/* Logo  */}
                    <div><Link href={'/'} className='text-xl'>Nazar Brothers</Link></div>

                    {/* Profile  */}
                    <div>
                        <Link href={`/account/profile/${user.uid}`}>
                            <div className='bg-gray-300 flex justify-center items-center rounded-full w-8 h-8'>
                                {user.email.slice(0,1).toUpperCase() || "N"}
                            </div>
                        </Link>
                    </div>

                </header>

                <div className='md:flex  justify-between'>


                    <aside className='flex md:flex-col gap-4 md:mt-6 mb-4 md:w-[200px]'>
                        <div>
                            <Link href={`/account/orders/${user.uid}`}>
                                Orders
                            </Link>
                        </div>
                        <div>
                            <Link href={`/account/profile/${user.uid}`}>

                                Profile
                            </Link>
                        </div>
                    </aside>






                    <main className=''>

                        {children}
                    </main>

                    <div className='md:w-[200px]'>
                        
                    </div>

                </div>
            </div>

        </div>
    );
}