import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { account, ID } from "../api/appwriter";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from "../../context/UserContext";

const HomeScreen = () => {
  const [userdata, setuserdata] = useState("");
  const { user, setUser, loading, logout } = useUser();

  const router = useRouter(); // Initialize useRouter
  const sections = [
    {
      title: "Workouts",
      items: [
        {
          name: "Yoga",
          img: "/images/yoga.jpeg",
        },
        {
          name: "Weightlifting",
          img: "/images/weightlifting.jpg",
        },
        {
          name: "Cardio",
          img: "/images/cardio.jpg",
        },
        {
          name: "HIIT",
          img: "/images/hiit.jpeg",
        },
        {
          name: "CrossFit",
          img: "/images/crossFit.jpg",
        },
        {
          name: "Pilates",
          img: "/images/pilates.jpg",
        },
        {
          name: "Stretching",
          img: "/images/stretching.jpg",
        },
        {
          name: "Running",
          img: "/images/running.jpg",
        },
      ],
    },
    {
      title: "Exercises",
      items: [
        {
          name: "Push-Ups",
          img: "/images/pushups.jpg",
        },
        {
          name: "Squats",
          img: "/images/squats.jpg",
        },
        {
          name: "Plank",
          img: "/images/plank.jpg",
        },
        {
          name: "Deadlifts",
          img: "/images/deadlifts.jpg",
        },
      ],
    },
    {
      title: "Diets",
      items: [
        {
          name: "Keto Diet",
          img: "/images/keto.jpg",
        },
        {
          name: "High Protein",
          img: "/images/protein.jpg",
        },
        {
          name: "Vegan Diet",
          img: "/images/vegan.jpg",
        },
        {
          name: "Balanced Diet",
          img: "/images/balanced.jpg",
        },
      ],
    },
  ];
  // Fetch user data
  const fetchUser = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
    } catch (error) {
      console.error("User not authenticated:", error.message);
      setUser(null);
    } finally {
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  console.log("user", user);
  return (
    <div className="min-h-screen bg-black text-white px-6 pb-12">
      <Header />
      <section className="relative min-h-screen mb-5 ">
        <Image
          src="/images/register.avif"
          alt="Fitness Hero"
          layout="fill"
          objectFit="cover"
          className="brightness-75 grayscale"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold">Welcome, {user?.name}!</h1>
          <p className="mt-2 text-lg">Your AI-powered personal trainer</p>
        </div>
      </section>

      {sections.map((section) => (
        <div key={section.title} className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">
            {section.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item) => (
              <div
                key={item.name}
                className="relative h-60 overflow-hidden rounded-lg shadow-lg group"
              >
                <div className="w-full h-full overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="grayscale transition-all duration-300 transform scale-100 group-hover:scale-110 group-hover:grayscale-0"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-xl font-semibold">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeScreen;
