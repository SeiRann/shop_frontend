"use client";
import { useGlobalContext } from "../context/globalContext";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { isAdmin } = useGlobalContext();

    if (!isAdmin) {
        router.push("/");
    }

    return <>{children}</>;
}
