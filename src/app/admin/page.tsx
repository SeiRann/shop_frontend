"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGlobalContext } from "../context/globalContext";

export default function AdminPage() {
    const router = useRouter();
    const { isAdmin } = useGlobalContext();

    if (!isAdmin) {
        router.push("/");
    }

    return (
        <div>
            <h1>Admin Page</h1>
            <Link href="/admin/products">Products</Link>
            <Link href="/admin/clients">Clients</Link>
            <Link href="/admin/reviews">Reviews</Link>
        </div>
    );
}
