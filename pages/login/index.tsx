"use client";

import { CardFooter } from "../../components/ui/card";

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
} from "../../components/ui/card";
import { useRouter } from "next/router"; // Import useRout
import { account } from "../api/appwriter";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";
export default function LoginPage() {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const router = useRouter(); // Initialize useRouter
  const { user, setUser, loading, showLoader, hideLoader } = useUser();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      showLoader();
      const res = await account.createEmailPasswordSession(email, password);
      toast.success("Logged in successfully");
      console.log(res);
      router.push("/home");
    } catch (error: any) {
      toast.error("Login failed");
      console.log(error.message);
    } finally {
      hideLoader();
    }
  };
  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      style={{
        backgroundImage: "url('/images/login-screen.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <Card className="w-full max-w-md z-10 bg-black/65">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription className="text-white font-bold ">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white font-bold">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white font-bold">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline text-white"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              variant="outline"
              className="px-8 w-full text-lg font-semibold text-white/80 bg-black/60 hover:bg-white/70 hover:text-black/90"
            >
              Login
            </Button>
            <div className="text-center text-sm text-white">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
