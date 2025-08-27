"use client"; // make this a client component
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/globalContext";

export default function LoginClientForm() {
    const router = useRouter();
    const { setIsAdmin, isAdmin, isLoggedIn, setIsLoggedIn } =
        useGlobalContext();
    const onRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page reload

        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        // console.log(process.env.NEXT_PUBLIC_API_URL + "client/");
        // console.log(JSON.stringify(data));
        // call your backend API
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            },
        );

        const adminRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/admin`,
            {
                method: "GET",
                credentials: "include",
            },
        );
        if (adminRes.status === 200) {
            setIsAdmin(true);
        }

        if (res.ok) {
            setIsLoggedIn(true);
            router.push("/");
        } else {
            //   console.log(process.env.DB_URL + "client/");
            //   console.log(JSON.stringify(data));
            console.error("Error signing in client");
        }
    };

    return (
        <div className="w-1/3">
            <form onSubmit={onRegisterSubmit}>
                <div className="flex flex-col gap-3">
                    <h1 className="text-3xl">Sign In</h1>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" className="bg-amber-200" />
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        className="bg-amber-200"
                    />
                    <button type="submit" className="bg-blue-500 rounded-sm">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}
