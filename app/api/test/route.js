import connectDB from "@/lib/mongodb";
const { NextResponse } = require("next/server");


export async function GET(res) {
    try {
        const data = await connectDB()
        if(!data){
            return NextResponse.json({success:false, message:"bh"})
        }

        return NextResponse.json({success:true, message:"Db is connect"})
        
    } catch (error) {
        return NextResponse.json({success:false, message:"Something went wrong", errorMSg: error})
        
    }
  
    

    
}