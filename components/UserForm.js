"use client";
import { BiSolidSend } from "react-icons/bi";
import InputText from "@/components/form/InputText";
import CustomSelect from "@/components/form/CustomSelect";
import { AI_SOURCES, FITNESS_LEVELS, GENDERS, GOALS } from "@/constants";
import toast from "react-hot-toast";
import { geminiApiGenerateMsg } from "@/geminiAiServices";
import ImageUploader from "./ImageUploader";
import { useState } from "react";

export default function UserForm({ setData, setLoading, loading }) {
  const [type, setType] = useState("diet");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [fitnessLevel, setFitnessLevel] = useState("beginner");
  const [goal, setGoal] = useState("muscle-gain");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission and page reload
    setLoading(true);
    console.log("handleSubmit");

    // Retrieve the form field values
    // const model = event.target.elements.model?.value;
    // const height = event.target.elements.height?.value;
    // const weight = event.target.elements.weight?.value;
    // const age = event.target.elements.age?.value;
    // const gender = event.target.elements.gender?.value;
    // const fitnessLevel = event.target.elements.fitnessLevel?.value;
    // const goal = event.target.elements.goal?.value;

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
  console.log("type", type);
  console.log("height", height);

  return (
    <div
      className="w-full my-10 mt-6 p-4 border border-gray-100 rounded-xl shadow-md"
      // onSubmit={handleSubmit}
      // autoComplete={"off"}
    >
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <CustomSelect
            id={"model"}
            label={"Select Type"}
            values={AI_SOURCES}
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
      </div>
      <hr className={"my-5"} />
      {type !== "exercise" ? (
        <div className="p-6 ">
          <ImageUploader />
        </div>
      ) : (
        <>
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
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
              className="rounded-md bg-primary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark disabled:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
        </>
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-bold text-lg rounded-md p-4 ring-1 ring-inset ring-primary-light">
            Loading...
          </div>
        </div>
      )}
    </div>
  );
}
