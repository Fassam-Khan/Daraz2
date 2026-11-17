"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { signOut, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { EditInfo } from "./EditInfo";
import { AddressAdd } from "./AddressAdd";
import { EditAddress } from "./EditAddress";

const ProfilePage = () => {
  const { id } = useParams();

  const [UserData, setUserData] = useState({});
  const [IsEditInfo, setIsEditInfo] = useState(false);

  const [AddAdress, setAddAdress] = useState(false);

  const [Address, setAddress] = useState([]);

  const [IsEditAddress, setIsEditAddress] = useState(false);
  const [AddressData, setAddressData] = useState({});

  // Get User
  useEffect(() => {
    const getUser = async () => {
      try {
        if (!id) return;

        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [id, IsEditInfo]);

  // Get Addresses
  useEffect(() => {
    const getAddresses = async () => {
      try {
        if (!id) return;

        const addressRef = collection(
          db,
          "users",
          id,
          "addresses"
        );

        const snapshot = await getDocs(addressRef);

        const addresses = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAddress(addresses);
      } catch (error) {
        console.log("Error getting addresses:", error);
      }
    };

    getAddresses();
  }, [id, AddAdress, IsEditAddress]);

  // Edit Address
  const editAddress = (address) => {
    setAddressData(address);
    setIsEditAddress(true);
  };

  // Logout
  const logOutUser = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);

      toast.warning("Logout successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:w-[700px] w-full md:m-auto">

      {/* User Name */}
      <div className="flex justify-between">
        <p>
          {UserData.firstName} {UserData.lastName}
        </p>

        <button
          className="cursor-pointer border text-blue-500 hover:text-blue-700 rounded-md px-2 py-0.5"
          onClick={() => setIsEditInfo(true)}
        >
          Edit
        </button>
      </div>

      {/* Email */}
      <div className="flex flex-wrap justify-between mt-6 border rounded-lg shadow-xl px-4 py-3 items-center">
        <p className="text-gray-400">Email</p>

        <p className="text-black text-sm">
          {UserData.email}
        </p>
      </div>

      {/* Addresses Header */}
      <div className="flex justify-between mt-10">
        <p>Addresses</p>

        <button
          className="cursor-pointer border text-blue-500 hover:text-blue-700 rounded-md px-2 py-0.5"
          onClick={() => setAddAdress(true)}
        >
          Add
        </button>
      </div>

      {/* Addresses */}
      {Address.length > 0 ? (
        Address.map((address) => (
          <button
            onClick={() => editAddress(address)}
            key={address.id}
            className="flex justify-between mt-6 border w-full rounded-lg shadow-xl px-4 py-3 items-center"
          >
            <div className="flex gap-4">

              <div className="w-6 h-6 p-1 bg-gray-300 rounded-md flex justify-center items-center">
                <MapPin size={16} />
              </div>

              <div className="flex flex-col items-start">

                <p className="text-sm">
                  {address.firstName} {address.lastName}
                </p>

                <p className="text-xs text-gray-500">
                  {address.address}
                </p>

                <p className="text-xs text-gray-500">
                  {address.city}, {address.country}
                </p>

              </div>

            </div>

            <ArrowRight size={18} />
          </button>
        ))
      ) : (
        <button className="flex justify-between mt-6 border w-full rounded-lg shadow-xl px-4 py-3 items-center">
          <div className="flex gap-4">

            <div className="w-6 h-6 p-1 bg-gray-300 rounded-md flex justify-center items-center">
              <MapPin size={16} />
            </div>

            <div className="flex flex-col items-start">
              <p className="text-sm">
                No Address Added
              </p>
            </div>

          </div>

          <ArrowRight size={18} />
        </button>
      )}

      {/* Logout */}
      <div className="mt-10">
        <button
          className="cursor-pointer border text-blue-500 hover:text-blue-700 rounded-md px-2 py-0.5"
          onClick={logOutUser}
        >
          Logout
        </button>
      </div>

      {/* Edit User Info */}
      {IsEditInfo && (
        <EditInfo
          User={UserData}
          open={IsEditInfo}
          setOpen={setIsEditInfo}
          userid={id}
        />
      )}

      {/* Edit Address */}
      {IsEditAddress && (
        <EditAddress
          Address={AddressData}
          open={IsEditAddress}
          setOpen={setIsEditAddress}
          userid={id}
        />
      )}

      {/* Add Address */}
      {AddAdress && (
        <AddressAdd
          User={UserData}
          open={AddAdress}
          setOpen={setAddAdress}
          userid={id}
        />
      )}

    </div>
  );
};

export default ProfilePage;