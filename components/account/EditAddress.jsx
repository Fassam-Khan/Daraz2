"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

import {
    InputGroup,
    InputGroupInput,
} from "@/components/ui/input-group";

import { ToastContainer, toast } from "react-toastify";
import SelectCountry from "./SelectCountry";


export function EditAddress({
    Address,
    open,
    setOpen,
    userid,
}) {

    const [AddressData, setAddressData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        optionalAddress: "",
        city: "",
        postalcode: "",
        phone: "",
        country: "",
    });

    const [Loading, setLoading] = useState(false);


    // Set selected address data
    useEffect(() => {

        if (Address) {
            setAddressData({
                firstName: Address.firstName || "",
                lastName: Address.lastName || "",
                address: Address.address || "",
                optionalAddress: Address.optionalAddress || "",
                city: Address.city || "",
                postalcode: Address.postalcode || "",
                phone: Address.phone || "",
                country: Address.country || "",
            });
        }

    }, [Address]);


    // Input handler
    const changeHandler = (e) => {

        const { name, value } = e.target;

        setAddressData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // Country handler
    const countryHandler = (value) => {

        setAddressData((prev) => ({
            ...prev,
            country: value,
        }));

    };


    // Update address
    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            if (!userid || !Address?.id) {
                toast.error("Address ID not found");
                return;
            }

            setLoading(true);

            const addressRef = doc(
                db,
                "users",
                userid,
                "addresses",
                Address.id
            );

            await updateDoc(addressRef, AddressData);

            toast.success("Address updated successfully");

            setOpen(false);

        } catch (error) {

            console.log("Update address error:", error);

            toast.error("Something went wrong");

        } finally {

            setLoading(false);

        }

    };


    // Delete address
    const deleteAddress = async () => {

        try {

            // First address cannot be deleted
            if (Address?.isFirstAddress) {
                toast.warning("First address cannot be deleted");
                return;
            }


            if (!userid || !Address?.id) {
                toast.error("Address ID not found");
                return;
            }


            const confirmDelete = window.confirm(
                "Are you sure you want to delete this address?"
            );

            if (!confirmDelete) {
                return;
            }


            setLoading(true);


            const addressRef = doc(
                db,
                "users",
                userid,
                "addresses",
                Address.id
            );


            await deleteDoc(addressRef);


            toast.success("Address deleted successfully");

            setOpen(false);


        } catch (error) {

            console.log("Delete address error:", error);

            toast.error("Something went wrong");

        } finally {

            setLoading(false);

        }

    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent className="sm:max-w-sm overflow-auto">

                <form onSubmit={submitHandler}>

                    <DialogHeader>

                        <DialogTitle>
                            Edit Address
                        </DialogTitle>


                        <DialogDescription asChild>

                            <div className="mt-4 flex flex-col gap-4 no-scrollbar max-h-[50vh] overflow-y-auto px-1">


                                {/* Country */}

                                <div>

                                    <SelectCountry
                                        handler={countryHandler}
                                        value={AddressData.country}
                                        name="country"
                                    />

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

                                <div>

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


                                {/* Optional Address */}

                                <div>

                                    <Label htmlFor="optionalAddress">
                                        Optional address
                                    </Label>

                                    <InputGroup className="mt-2">

                                        <InputGroupInput
                                            type="text"
                                            name="optionalAddress"
                                            id="optionalAddress"
                                            value={AddressData.optionalAddress}
                                            onChange={changeHandler}
                                        />

                                    </InputGroup>

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

                                        <Label htmlFor="postalcode">
                                            Postal Code
                                        </Label>

                                        <InputGroup className="mt-2">

                                            <InputGroupInput
                                                type="text"
                                                name="postalcode"
                                                id="postalcode"
                                                value={AddressData.postalcode}
                                                onChange={changeHandler}
                                            />

                                        </InputGroup>

                                    </div>

                                </div>


                                {/* Phone */}

                                <div>

                                    <Label htmlFor="phone">
                                        Phone Number
                                    </Label>

                                    <InputGroup className="mt-2">

                                        <InputGroupInput
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            value={AddressData.phone}
                                            onChange={changeHandler}
                                        />

                                    </InputGroup>

                                </div>


                            </div>

                        </DialogDescription>

                    </DialogHeader>


                    {/* Footer */}

                    <DialogFooter className="mt-6 flex sm:justify-between">

                        {/* Delete */}
                        {!Address?.isFirstAddress && (
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={deleteAddress}
                                disabled={Loading}
                            >
                                Delete
                            </Button>
                        )}


                        <div className="flex gap-2 ml-auto">

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                disabled={Loading}
                            >
                                Cancel
                            </Button>


                            <Button
                                type="submit"
                                disabled={Loading}
                            >
                                {Loading ? "Saving..." : "Save changes"}
                            </Button>

                        </div>

                    </DialogFooter>

                </form>

            </DialogContent>

            <ToastContainer />

        </Dialog>
    );
}