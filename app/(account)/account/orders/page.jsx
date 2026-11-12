"use client"
import React from 'react'
import { useSelector } from 'react-redux'

const page = () => {

  const { user, loading } = useSelector((state) => state.auth);


  console.log(user)
  return (
    <div>
        <h1>Hi i  am account page</h1>
      
    </div>
  )
}

export default page
