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
import {  getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"
import { db } from "@/lib/firebase"
import { doc, setDoc } from "firebase/firestore"; 






export function InputRegister() {



    const [ShowPass, setShowPass] = useState(false)
    const [ErrorMessage, setErrorMessage] = useState("")
    const [Data, setData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    })
    const [Loading, setLoading] = useState(false)




    const submitHandler = async () => {
        setLoading(true)

        if (!Data.email.trim()) {
            return toast.warning("Please enter email")

        }
        if (!Data.password.trim()) {
            return toast.warning("Please enter password")

        }
        if (Data.password.length < 6) {
            return toast.warning("Please create password atleast 6 charachers")

        }

        try {

            const res = await createUserWithEmailAndPassword(auth, Data.email, Data.password)
            if(res.user){
              const userData =  await setDoc(doc(db, "users", res.user.uid), {
                email: Data.email,
                firstName: Data.firstName,
                lastName: Data.lastName
              });
                toast.success("User created successfully")
                setData({
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: ""
                })


            }

            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }finally{
            setLoading(false)
        }
    }

    const changeHandler = (e) => {
        const { name, value } = e.target

        setData((prev) => ({ ...prev, [name]: value }))

    }


    return (
        <div className="grid w-full max-w-sm gap-6 px-2">
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

            <div>
                <Label htmlFor="firstName"> First Name</Label>
                <InputGroup className="mt-3">
                    <InputGroupInput type="text"
                        value={Data.firstName}
                        onChange={(e) => changeHandler(e)}
                        name="firstName"
                        id="firstName" placeholder="Enter your first name" />
                </InputGroup>
            </div>

            <div>
                <Label htmlFor="lastName"> Last Name</Label>
                <InputGroup className="mt-3" >


                    <InputGroupInput

                        value={Data.lastName}
                        onChange={(e) => changeHandler(e)}
                        name="lastName"
                        type="text" id="lastName" placeholder="Enter your last name" />
                </InputGroup>
            </div>

            <div className="w-full">
                <button  onClick={submitHandler} className="cursor-pointer rounded-full px-2 py-1 bg-red-500 text-white font-semibold w-full">{Loading ? "Loading": "Create Account"}</button>
            </div>

            <ToastContainer/>

        </div>
    )
}
