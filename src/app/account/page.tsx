"use client";
import RegisterClientForm from "../components/registerClientForm";
import SignInForm from "../components/signInClientForm";
import { useState } from "react";
import { useGlobalContext } from "../context/globalContext";

export default function AccountPage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const { isLoggedIn } = useGlobalContext();

  console.log(isLoggedIn);
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
      <button>Log out</button>
    </div>
  );
}
