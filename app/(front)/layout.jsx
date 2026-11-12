import { Poppins } from "next/font/google";
import Link from "next/link";
import "@/app/globals.css";
import StoreProvider from "@/components/storeProvider";

// Configure Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "My Next.js App",
  description: "Modern layout built with Next.js and Poppins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">
        <StoreProvider>      

          {children}
          </StoreProvider>


        
      </body>
    </html>
  );
}