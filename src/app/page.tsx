"use client";
import { useGlobalContext } from "./context/globalContext";
import Link from "next/link";

export default function Home() {
  const { isLoggedIn } = useGlobalContext();

  console.log(isLoggedIn);
  return (
    <div>
      <Link href="/account">Account</Link>
    </div>
  );
}
