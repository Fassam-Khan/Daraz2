"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";




import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { MailIcon } from "lucide-react";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { ToastContainer, toast } from "react-toastify";
import SelectCountry from "./SelectCountry";

export function AddressAdd({ User, open, setOpen, userid }) {

    const [AddressData, setAddressData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        optionalAddress: "",
        city: "",
        postalcode: "",
        phone: "",
        country: ""
    })




    const changeHandler = (e) => {
        const { name, value } = e.target;

        setAddressData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const countryHandler = (value) => {
        setAddressData({
            ...AddressData,
            country: value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            console.log(AddressData)
            const addressRef = collection(
                db,
                "users",
                userid,
                "addresses"
              );
              await addDoc(addressRef, AddressData);
            toast.success("Address Added")
            setAddressData({
                firstName: "",
                lastName: "",
                address: "",
                optionalAddress: "",
                city: "",
                postalcode: "",
                phone: "",
                country: ""

            })


        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent className="sm:max-w-sm overflow-auto">

                <form onSubmit={submitHandler}>

                    <DialogHeader>

                        <DialogTitle>
                            Add Address
                        </DialogTitle>

                        <DialogDescription asChild>
                            <div className="mt-4 flex flex-col gap-4 no-scrollbar max-h-[50vh] overflow-y-auto px-1">

                                {/* Select Country  */}
                                <div>
                                    <SelectCountry handler={countryHandler} value={AddressData.country} name={"country"} />
                                </div>

                                {/* First + Last Name */}
                                <div className="flex gap-2">

                                    <div className="w-full">
                                        <Label htmlFor="firstName">
                                            First Name
                                        </Label>

                                        <InputGroup className="mt-2">
                                            <InputGroupInput
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                value={AddressData.firstName}
                                                onChange={changeHandler}
                                            />
                                        </InputGroup>
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="lastName">
                                            Last Name
                                        </Label>

                                        <InputGroup className="mt-2">
                                            <InputGroupInput
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                value={AddressData.lastName}
                                                onChange={changeHandler}
                                            />
                                        </InputGroup>
                                    </div>

                                </div>

                                {/* Address */}
                                <div className="flex gap-2">
                                    <div className="w-full">
                                        <Label htmlFor="address">
                                            Address
                                        </Label>

                                        <InputGroup className="mt-2">
                                            <InputGroupInput
                                                type="text"
                                                name="address"
                                                id="address"
                                                value={AddressData.address}
                                                onChange={changeHandler}
                                            />
                                        </InputGroup>
                                    </div>

                                </div>

                                {/* Appartment */}
                                <div className="flex gap-2">
                                    <div className="w-full">
                                        <Label htmlFor="address">
                                            Optional address
                                        </Label>

                                        <InputGroup className="mt-2">
                                            <InputGroupInput
                                                type="text"
                                                name="optionalAddress"
                                                id="address"
                                                value={AddressData.optionalAddress}
                                                onChange={changeHandler}
                                            />
                                        </InputGroup>
                                    </div>

                                </div>

                                {/* City + Postal */}
                                <div className="flex gap-2">

                                    <div className="w-full">
                                        <Label htmlFor="city">
                                            City
                                        </Label>

                                        <InputGroup className="mt-2">
                                            <InputGroupInput
                                                type="text"
                                                name="city"
                                                id="city"
                                                value={AddressData.city}
                                                onChange={changeHandler}
                                            />
                                        </InputGroup>
                                    </div>

                                    <div className="w-full">
                                        <Label htmlFor="postalCode">
                                            Postal Code
                                        </Label>

                                        <InputGroup className="mt-2">
                                            <InputGroupInput
                                                type="number"
                                                name="postalcode"
                                                id="postalCode"
                                                value={AddressData.postalcode}
                                                onChange={changeHandler}
                                            />
                                        </InputGroup>
                                    </div>

                                </div>

                                {/* Phone */}
                                <div className="flex gap-2">
                                    <div className="w-full">
                                        <Label htmlFor="phone">
                                            Phone Number
                                        </Label>

                                        <InputGroup className="mt-2">
                                            <InputGroupInput
                                                type="number"
                                                name="phone"
                                                id="phone"
                                                value={AddressData.phone}
                                                onChange={changeHandler}
                                            />
                                        </InputGroup>
                                    </div>

                                </div>




                            </div>
                        </DialogDescription>

                    </DialogHeader>

                    <DialogFooter className="mt-6">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button type="submit">
                            Save changes
                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>
            <ToastContainer />

        </Dialog>
    );
}