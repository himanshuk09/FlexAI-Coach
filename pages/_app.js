import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "../context/UserContext";
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <Toaster />
    </UserProvider>
  );
}
