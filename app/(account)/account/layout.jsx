"use client"
import '@/app/globals.css'
import { Poppins } from "next/font/google";
import Link from 'next/link';
import { useSelector } from 'react-redux';






const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
    display: "swap",
});

export default function AccountLayout({ children }) {

    const {user, loading} = useSelector((state)=> state.auth)

    if(loading){
        return <p>Loading..</p>
    }

      if (!user) {
    return (
      <div>
        <h1>My Account</h1>
        <p>You are not logged in.</p>

        <button>Login</button>
      </div>
    );
  }

    

    




    return (
        <div className='font-poppins  text-slate-900  '>
            <div className='max-w-[1200px] m-auto'>
                <header className=' flex justify-between  items-center h-15 '>
                    {/* Logo  */}
                    <div><Link href={'/'} className='text-xl'>Nazar Brothers</Link></div>

                    {/* Profile  */}
                    <div>
                        <Link href={`/account/profile/${user.uid}`}>
                            <div className='bg-gray-300 flex justify-center items-center rounded-full w-8 h-8'>
                                M
                            </div>
                        </Link>
                    </div>

                </header>

                <div className='flex  justify-between'>


                    <aside className='flex flex-col gap-4 mt-6 w-[200px]'>
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