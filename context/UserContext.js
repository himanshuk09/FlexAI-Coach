import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../pages/api/appwriter"; // Adjust the path accordingly
import { useRouter } from "next/router";

// Create User Context
const UserContext = createContext(null);

// Custom Hook to use the context
export const useUser = () => useContext(UserContext);

// User Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to start loader
  const showLoader = () => setLoading(true);

  // Function to stop loader
  const hideLoader = () => setLoading(false);
  const checkSession = async () => {
    try {
      const session = await account.getSession("current");
      if (!session) {
        console.log("No active session, redirecting to login...");
        router.push("/");
      }
      fetchuser();
    } catch (error) {
      console.error("Session error:", error.message);
      router.push("/");
    }
  };
  // Logout function
  const logout = async () => {
    try {
      showLoader();
      await account.deleteSession("current");
      setUser(null);
      router.push("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      hideLoader();
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, showLoader, hideLoader, logout }}
    >
      {loading && ( // Show loader only when loading is true
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-bold text-lg ">
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
              <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
              <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
            </div>
          </div>
        </div>
      )}

      {children}
    </UserContext.Provider>
  );
};
