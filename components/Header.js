"use client";
import toast from "react-hot-toast";
import { account, ID } from "../pages/api/appwriter";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "../context/UserContext";
export default function Header() {
  const { user, setUser, loading, setLoading, logout } = useUser();
  const router = useRouter(); // Initialize router

  return (
    <div className="p-4 border-b fixed w-full z-50 bg-black/80">
      <div className="px-3 flex items-center  justify-between">
        <div className="flex gap-4 items-center">
          <Link
            href={"/home"}
            className="text-transparent bg-clip-text text-5xl font-bold bg-gradient-to-r from-[#999999] to-[#FFFFFF]"
          >
            AI Fitness Trainer
          </Link>
          <h1 className="text-white">Hii 🖐️, {user?.name}</h1>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            onClick={() => router.push("/diet")}
            className="rounded-md border border-white bg-black/60 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/90 disabled:bg-black/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Diet
          </button>
          <button
            type="submit"
            onClick={() => router.push("/exercise")}
            className="rounded-md border border-white bg-black/60 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/90 disabled:bg-black/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Exercise
          </button>
          <button
            type="submit"
            onClick={logout}
            className="rounded-md border border-white bg-black/60 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/90 disabled:bg-black/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
