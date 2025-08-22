"use client"; // make this a client component
import { useRouter } from "next/navigation";

export default function RegisterClientForm() {
  const router = useRouter();
  const onRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload

    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      address: formData.get("address"),
      phone_number: Number(formData.get("phoneNumber")),
    };

    console.log(process.env.DB_URL + "client/");
    console.log(JSON.stringify(data));
    // call your backend API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/client/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      console.log("Client created successfully!");
      router.push("/");
    } else {
      console.log(process.env.DB_URL + "client/");
      console.log(JSON.stringify(data));
      console.error("Error creating client");
    }
  };

  return (
    <div className="w-1/3">
      <form onSubmit={onRegisterSubmit}>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl">Client Creation Form</h1>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" className="bg-amber-200" />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" className="bg-amber-200" />
          <label htmlFor="password">Password</label>
          <input type="text" name="password" className="bg-amber-200" />
          <label htmlFor="address">Address</label>
          <input type="text" name="address" className="bg-amber-200" />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" name="phoneNumber" className="bg-amber-200" />
          <button type="submit" className="bg-blue-500 rounded-sm">
            Create Client
          </button>
        </div>
      </form>
    </div>
  );
}
