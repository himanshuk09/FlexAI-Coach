import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { DietIntro } from "../../components/Intro";
import Footer from "../../components/Footer";
import UserForm from "../../components/UserForm";
import TableToPDF from "../../components/TableToPDF";
import { useRouter } from "next/router";
import { account, ID } from "../api/appwriter";
export default function Home() {
  const [userdata, setuserdata] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchuser = async () => {
    try {
      const user = await account.get();
      console.log("Current user:", user);
      setuserdata(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchuser();
  }, []);
  useEffect(() => {
    console.log(userdata);
  }, [userdata]);
  return (
    <main className="flex flex-col min-h-screen bg-black">
      <div
        className={"w-full min-h-screen  flex-grow"}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <div className={"mt-24 px-4 my-6"}>
          <div className={"max-w-5xl p-4 mx-auto bg-black/60"}>
            <DietIntro name={userdata?.name} />
            <div className={"w-full"}>
              <UserForm
                setData={setData}
                setLoading={setLoading}
                loading={loading}
              />
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
