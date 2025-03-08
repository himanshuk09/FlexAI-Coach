import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { DietIntro } from "../../components/Intro";
import Footer from "../../components/Footer";
import UserForm from "../../components/UserForm";
import TableToPDF from "../../components/TableToPDF";
import { useUser } from "../../context/UserContext";
export default function Home() {
  const { user, setUser, logout, loading, showLoader, hideLoader } = useUser();
  const [data, setData] = useState([]);

  return (
    <main className="flex flex-col min-h-screen bg-black">
      <div
        className={"w-full min-h-screen  flex-grow"}
        style={{
          backgroundImage: "url('/images/login-screen.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <div className={"mt-24 px-4 my-6"}>
          <div className={"max-w-5xl p-4 mx-auto bg-black/60"}>
            <DietIntro name={user?.name} />
            <div className={"w-full"}>
              <UserForm setData={setData} />
            </div>
          </div>
        </div>
      </div>
      <div className={`${data.length > 0 ? "mt-24 px-14 my-6" : ""}`}>
        {loading ? (
          <div
            className={
              "w-full text-center text-secondary-light p-2 text-xl font-normal"
            }
          >
            Working on it...
          </div>
        ) : data.length > 0 ? (
          <TableToPDF data={data} />
        ) : undefined}
      </div>
    </main>
  );
}
