"use client";
import RegisterClientForm from "../components/registerClientForm";
import SignInForm from "../components/signInClientForm";
import { useState } from "react";
import { useGlobalContext } from "../context/globalContext";

export default function AccountPage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setIsAdmin } = useGlobalContext();

  const onLogOut = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setIsLoggedIn(false);
    setIsAdmin(false);

    if (res.ok) {
      console.log("User successfully logged out!");
    } else {
      console.log("Log out failed!");
    }
  };

  return !isLoggedIn ? (
    <div>
      <h1>Account Page</h1>
      {showSignIn ? (
        <div>
          <RegisterClientForm />
          <button
            className="text-cyan-500"
            onClick={() => setShowSignIn(!showSignIn)}
          >
            Sign in
          </button>
        </div>
      ) : (
        <div>
          <SignInForm />
          <button
            className="text-cyan-500"
            onClick={() => setShowSignIn(!showSignIn)}
          >
            Register
          </button>
        </div>
      )}
    </div>
  ) : (
    <div>
      <button onClick={() => onLogOut()}>Log out</button>
    </div>
  );
}
