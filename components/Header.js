import toast from "react-hot-toast";
import { account, ID } from "../pages/api/appwriter";
import { useRouter } from "next/router";
export default function Header() {
  const router = useRouter(); // Initialize router
  const logout = async () => {
    try {
      await account.deleteSession("current");
      toast.success("Successfully logged out");
      router.push("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error.message);
      toast.error("Failed to log out");
    }
  };
  return (
    <div className="p-4 border-b fixed w-full z-50 bg-black/80">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-transparent bg-clip-text text-5xl font-bold bg-gradient-to-r from-[#999999] to-[#FFFFFF]">
          AI Fitness Trainer
        </h1>
        <button
          type="submit"
          onClick={logout}
          className="rounded-md border border-white bg-black/60 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/90 disabled:bg-black/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
