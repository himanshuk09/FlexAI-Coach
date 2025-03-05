"use client";
import { BiSolidSend } from "react-icons/bi";
import InputText from "../components/form/InputText";
import CustomSelect from "../components/form/CustomSelect";
import { AI_SOURCES, FITNESS_LEVELS, GENDERS, GOALS } from "../constants";
import toast from "react-hot-toast";
import { geminiApiGenerateMsg } from "../geminiAiServices";
import { useState } from "react";
import { useRouter } from "next/router";
import { IoNavigate } from "react-icons/io5";
export default function UserForm({ setData, setLoading, loading }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [fitnessLevel, setFitnessLevel] = useState("beginner");
  const [goal, setGoal] = useState("muscle-gain");
  const router = useRouter(); // Initialize useRouter
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission and page reload
    setLoading(true);
    console.log("handleSubmit");

    // Create an object with the form values
    const formData = {
      height,
      weight,
      age,
      gender,
      fitnessLevel,
      goal,
    };

    let response = await geminiApiGenerateMsg(formData);

    if (response) {
      response = await response;
      setLoading(false);
      setData(response);
      toast.success("Workout generated!");
    } else {
      response = await response;
      console.error("error");
      setLoading(false);
      toast.error("Failed To Generate");
    }
  };

  return (
    <div className="w-full my-10 mt-6 p-4 border  rounded-xl shadow-md">
      <div className="flex-1 flex-row items-end justify-end">
        <div className="mt-6 flex items-center justify-between gap-x-6">
          <div
            className={
              "flex justify-center items-center gap-2 text-white text-xl  font-bold"
            }
          >
            Generate Execise Plan
          </div>
          <button
            type="submit"
            onClick={() => router.push("/exercise")}
            disabled={loading}
            className="rounded-md bg-black/60 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/90 disabled:bg-black/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <div className={"flex justify-center items-center gap-2"}>
              Generate Execise Plan <IoNavigate />
            </div>
          </button>
        </div>
      </div>

      <hr className={"my-5"} />

      <div className="flex flex-wrap -mx-3 mb-3">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <InputText
            label={"Height (cm)"}
            id={"height"}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <InputText
            label={"Weight (kg)"}
            id={"weight"}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3  px-3 mb-6 md:mb-0">
          <InputText
            label={"Age (yr)"}
            id={"age"}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <CustomSelect
            id={"gender"}
            label={"Gender"}
            values={GENDERS}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <CustomSelect
            id={"fitnessLevel"}
            label={"Fitness Level"}
            values={FITNESS_LEVELS}
            value={fitnessLevel}
            onChange={(e) => setFitnessLevel(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <CustomSelect
            id={"goal"}
            label={"Goal"}
            values={GOALS}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-md bg-black/60 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/90 disabled:bg-black/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loading ? (
            "Please wait..."
          ) : (
            <div className={"flex justify-center items-center gap-2"}>
              Submit <BiSolidSend />
            </div>
          )}
        </button>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-bold text-lg ">
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
              <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
              <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
