"use client";
import { useGlobalContext } from "./context/globalContext";
import Link from "next/link";

export default function Home() {
    const { isAdmin } = useGlobalContext();

    return (
        <div>
            <Link href="/account">Account</Link>
            {isAdmin ? <Link href="/admin">Admin</Link> : <></>}
        </div>
    );
}
