"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../components/ui/card";
import { account, ID } from "../api/appwriter";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
export default function RegisterPage() {
  const { user, setUser, loading, showLoader, hideLoader } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, age, location, email, password } = formData;
    console.log(formData);

    try {
      showLoader();
      const response = await account.create(ID.unique(), email, password, name);
      toast.success("Account created successfully.");
      console.log(response);
      router.push("/home");
    } catch (error: any) {
      toast.error("Account wasn't created successfully");
      console.log(error.message);
    } finally {
      hideLoader();
    }
  };
  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      style={{
        backgroundImage: "url('/images/register.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <Card className="w-full max-w-md z-10 bg-black/65">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold ">
            Create an account
          </CardTitle>
          <CardDescription className="text-white font-bold">
            Enter your information to start your fitness journey
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white font-bold">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-white font-bold">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white font-bold">
                Location
              </Label>
              <Input
                id="location"
                placeholder="Enter your location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-bold">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Choose a email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-bold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              variant="outline"
              className="px-8 w-full text-lg font-semibold text-white/80 bg-black/60 hover:bg-black/90 hover:text-white/90"
            >
              Register
            </Button>
            <div className="text-center text-sm text-white">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
