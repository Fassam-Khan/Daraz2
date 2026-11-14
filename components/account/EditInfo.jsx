"use client";

import { Button } from "@/components/ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

export function EditInfo({ User, open, setOpen, userid }) {

  const [EditInfo, setEditInfo] = useState({
    firstName: "",
    lastName: "",
  });

  // User data modal open hone par state mein aaye
  useEffect(() => {
    if (User) {
      setEditInfo({
        firstName: User.firstName || "",
        lastName: User.lastName || "",
      });
    }
  }, [User]);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setEditInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    try {
      const userRef = doc(db, "users", userid);
  
      await updateDoc(userRef, {
        firstName: EditInfo.firstName,
        lastName: EditInfo.lastName,
      });
  
      toast.success("Edit Successfully");
  
  
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent className="sm:max-w-sm">

        <form onSubmit={submitHandler}>

          <DialogHeader>

            <DialogTitle>
              Edit profile
            </DialogTitle>

            <DialogDescription asChild>
              <div className="mt-4">

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
                        placeholder="Enter your first name"
                        value={EditInfo.firstName}
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
                        placeholder="Enter your last name"
                        value={EditInfo.lastName}
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
        <ToastContainer/>

      </DialogContent>

    </Dialog>
  );
}