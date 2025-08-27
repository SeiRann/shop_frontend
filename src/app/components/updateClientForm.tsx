"use client";

import { redirect } from "next/navigation";

export default function UpdateClientForm() {
    const onUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const id = formData.get("client_id");
        const data = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            address: formData.get("address"),
            phone_number: Number(formData.get("phoneNumber")),
        };

        const result = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/client/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            },
        );

        if (result.ok) {
            console.log("Client Info successfully update");
            redirect("/");
        } else {
            console.error("Failed Client update");
        }
    };

    return (
        <div className="w-1/3">
            <form onSubmit={onUpdateSubmit}>
                <div className="flex flex-col gap-3">
                    <h1>Client Update Form</h1>
                    <label htmlFor="client_id">Client ID</label>
                    <input type="text" name="client_id" />
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="bg-amber-200"
                    />
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" className="bg-amber-200" />
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        className="bg-amber-200"
                    />
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        name="address"
                        className="bg-amber-200"
                    />
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        className="bg-amber-200"
                    />
                    <button type="submit">Submit Changes</button>
                </div>
            </form>
        </div>
    );
}
