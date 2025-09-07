"use client";
import Link from "next/link";

export default function AdminPage() {
    return (
        <div>
            <h1>Admin Page</h1>
            <Link href="/admin/products">Products</Link>
            <Link href="/admin/clients">Clients</Link>
            <Link href="/admin/reviews">Reviews</Link>
        </div>
    );
}
