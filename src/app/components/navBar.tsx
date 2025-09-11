import Link from "next/link";
import { useGlobalContext } from "@/app/context/globalContext";

export default function NavBar() {
    const { isAdmin } = useGlobalContext();

    return (
        <div className="flex justify-between p-5 bg-amber-200 ">
            <Link href="/">Home</Link>
            <h1>Shop</h1>
            <Link href="/account">Account</Link>
            {isAdmin ? <Link href="/admin">Admin</Link> : <></>}
        </div>
    );
}
