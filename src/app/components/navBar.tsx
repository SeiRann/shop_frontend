import Link from "next/link";
import { useGlobalContext } from "@/app/context/globalContext";

export default function NavBar() {
    const { isAdmin, isLoggedIn, cartTotalQuantity } = useGlobalContext();

    return (
        <div className="flex justify-between p-5 bg-amber-200 ">
            <Link href="/">Home</Link>
            <h1>Shop</h1>
            <div className="flex gap-2">
                {cartTotalQuantity !== 0 ? (
                    <p className="relative bg-red-500 p-0.5 rounded-4xl text-sm left-11 bottom-2.5">
                        {cartTotalQuantity}
                    </p>
                ) : (
                    <></>
                )}
                {isLoggedIn ? <Link href="/cart">Cart</Link> : <></>}
                <Link href="/account">Account</Link>
                {isAdmin ? <Link href="/admin">Admin</Link> : <></>}
            </div>
        </div>
    );
}
