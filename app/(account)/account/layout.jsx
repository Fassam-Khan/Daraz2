
import '@/app/globals.css'
import { Poppins } from "next/font/google";
import Link from 'next/link';






const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
    display: "swap",
});

export default function AccountLayout({ children }) {

    




    return (
        <div className='font-poppins  text-slate-900  '>
            <div className='max-w-[1200px] m-auto'>
                <header className=' flex justify-between  items-center h-15 '>
                    {/* Logo  */}
                    <div><Link href={'/'} className='text-xl'>Nazar Brothers</Link></div>

                    {/* Profile  */}
                    <div>
                        <Link href={'/account/profile'}>
                            <div className='bg-gray-300 flex justify-center items-center rounded-full w-8 h-8'>
                                M
                            </div>
                        </Link>
                    </div>

                </header>

                <div className='flex  justify-between'>


                    <aside className='flex flex-col gap-4 mt-6 w-[200px]'>
                        <div>
                            <Link href={'/account/orders'}>
                                Orders
                            </Link>
                        </div>
                        <div>
                            <Link href={'/account/profile'}>

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