"use client"; // make this a client component
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterClientForm() {
    const router = useRouter();
    const [error, setError] = useState<string>("");

    const checkFields = (
        email: string,
        password: string,
        number: string,
        username: string,
    ) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

        setError("");

        if (username.length < 3) {
            setError("Username too short");
            return false;
        }

        if (!emailRegex.test(email)) {
            setError("Email format is incorrect");
            return false;
        }

        if (!passwordRegex.test(password)) {
            setError(
                "Password must be atleast 8 characters long and contain atleast 1 CAPITAL letter ,1 number and 1 special character",
            );
            return false;
        }

        if (number.length != 10) {
            setError("Number too short or too long");
            return false;
        }

        return true;
    };

    const onRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page reload

        const formData = new FormData(e.currentTarget);

        const data = {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            address: formData.get("address"),
            phone_number: Number(formData.get("phoneNumber")),
        };

        if (
            checkFields(
                data.email,
                data.password,
                String(data.phone_number),
                data.username,
            )
        ) {
            // call your backend API
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/client/`,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" },
                },
            );

            if (res.ok) {
                console.log("Client created successfully!");
                router.back();
            } else {
                console.log(process.env.DB_URL + "client/");
                console.log(JSON.stringify(data));
                console.error("Error creating client");
            }
        }
    };

    return (
        <div className="w-1/3">
            <form onSubmit={onRegisterSubmit}>
                <div className="flex flex-col gap-3">
                    <h1 className="text-3xl">Client Creation Form</h1>
                    <p
                        className="text-red-400 bg-red-200 border-red-600 border-2 rounded-md p-3"
                        style={
                            error === ""
                                ? { display: "none" }
                                : { display: "flex" }
                        }
                    >
                        {error}
                    </p>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="bg-amber-200"
                        required={true}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        className="bg-amber-200"
                        required={true}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        className="bg-amber-200"
                        required={true}
                    />
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        name="address"
                        className="bg-amber-200"
                        required={true}
                    />
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        className="bg-amber-200"
                        required={true}
                    />
                    <button type="submit" className="bg-blue-500 rounded-sm">
                        Create Client
                    </button>
                </div>
            </form>
        </div>
    );
}
