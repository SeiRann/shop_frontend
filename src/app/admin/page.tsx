"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAdmin = async () => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/admin`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    if (result.status === 401) {
      router.push("/");
    }
  };

  useEffect(() => {
    checkAdmin().finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin Page</h1>
      <Link href="/admin/products">Products</Link>
    </div>
  );
}
