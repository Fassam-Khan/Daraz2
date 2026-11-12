import '@/app/globals.css'
import { Poppins } from "next/font/google";


export const metadata = {
    title: "My Account | NazarBrothers",
    description: "",
  };




const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
    display: "swap",
  });

export default function AccountLayout({ children }) {
    return (
      <div className='font-poppins bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased'>
        <header>
          <h1>My Account</h1>
        </header>
  
      
         
  
          <main className=''>
            
            {children}
          </main>
     
      </div>
    );
  }