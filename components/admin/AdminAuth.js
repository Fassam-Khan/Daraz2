"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AdminAuth({ children }) {

    const router = useRouter();

    const { user, loading } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {

        // Firebase auth abhi check ho rahi hai
        if (loading) return;

        // User logged out
        if (!user) {
            router.push("/account/login");
            return;
        }

        // Admin check
        if (
            user.email !== "muhammadfassam465@gmail.com" &&
            user.role !== "admin"
        ) {
            toast.error("You are not admin");
            router.push("/");
            return;
        }

    }, [loading, user, router]);


    // Loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }


    // No user
    if (!user) {
        return null;
    }


    // Not admin
    if (
        user.email !== "muhammadfassam465@gmail.com") {
        return null;
    }


    return children;
}