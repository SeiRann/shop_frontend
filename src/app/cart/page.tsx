"use client";
import CartPage from "../components/cartPage";
import { useGlobalContext } from "../context/globalContext";
import { useRouter } from "next/navigation";

export default function CCartPage() {
    const { isLoggedIn } = useGlobalContext();
    const router = useRouter();

    if (!isLoggedIn) {
        router.push("/account");
    }

    return (
        <div>
            <CartPage />
        </div>
    );
}
