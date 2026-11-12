"use client"
import {
    CheckIcon,
    CreditCardIcon,
    InfoIcon,
    MailIcon,
    SearchIcon, EyeOffIcon,
    StarIcon,
} from "lucide-react"
import { Label } from "../ui/label"
import { useState } from "react"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { ToastContainer, toast } from "react-toastify"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"






export function InputLogin() {
    const user = useSelector((state)=> state.auth)
    console.log(user)


    



    const [ShowPass, setShowPass] = useState(false)
    const [ErrorMessage, setErrorMessage] = useState("")
    const [Data, setData] = useState({
        email: "",
        password: "",

    })
    const [Loading, setLoading] = useState(false)

    const router = useRouter()



    const submitHandler = async () => {
        setLoading(true)

        if (!Data.email.trim()) {
            return toast.warning("Please enter email")

        }
        if (!Data.password.trim()) {
            return toast.warning("Please enter password")

        }


        try {

            const res = await signInWithEmailAndPassword(auth, Data.email, Data.password)
            if (res.user) {
                toast.success("Login successfully")
                setData({
                    email: "",
                    password: "",

                })

                router.push(`/account/orders${res.uid}`)



            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)

        } finally {
            setLoading(false)
        }
    }

    const changeHandler = (e) => {
        const { name, value } = e.target

        setData((prev) => ({ ...prev, [name]: value }))

    }


    return (
        <div className="grid w-full max-w-sm gap-5 px-2">
            <div>
                <Label htmlFor="email"> Email address*</Label>
                <InputGroup className="mt-3">
                    <InputGroupInput type="email"

                        onChange={(e) => changeHandler(e)}
                        value={Data.email}
                        name="email"

                        id="email" placeholder="Enter your email" />
                    <InputGroupAddon>
                        <MailIcon />
                    </InputGroupAddon>
                </InputGroup>
            </div>

            <div>
                <Label htmlFor="password"> Password*</Label>
                <InputGroup className="mt-3">
                    <InputGroupInput value={Data.password}
                        onChange={(e) => changeHandler(e)}
                        id="password"
                        name="password"
                        type={ShowPass ? "text" : "password"}
                        placeholder="Enter password"
                    />
                    <InputGroupAddon align="inline-end" className="cursor-pointer" >
                        <EyeOffIcon onClick={() => setShowPass((prev) => !prev)} />
                    </InputGroupAddon>
                </InputGroup>
            </div>



            <div className="w-full">
                <button onClick={submitHandler} className="cursor-pointer rounded-full px-2 py-1 bg-red-500 text-white font-semibold w-full">{Loading ? "Loading" : "Login"}</button>
            </div>

            <div className="">
                <Link href={'/account/register'} className="cursor-pointer"><p className="text-sm underline">Don't have an account? Register here</p></Link>
            </div>

            <ToastContainer />

        </div>
    )
}





