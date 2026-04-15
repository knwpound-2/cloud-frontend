"use client";

import { useState } from "react";
import userRegister from "@/lib/api/userRegister";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await userRegister({ username, password });
      router.push("/auth/signin");
    } catch (err: any) {
      setError(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <main className="w-full h-screen flex flex-col justify-center items-center z-30 overflow-hidden pt-10">
        <div className="flex flex-col justify-center items-center w-fit h-fit bg-white/90 px-10 py-8 rounded-lg gap-5 shadow-md
        max-sm:px-4 max-sm:py-8 z-30">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="p-0 m-0 text-3xl font-bold max-sm:text-xl">
              Create an Account
            </h1>
            <p className="text-sm text-center">
              Your next unforgettable experience starts here
            </p>
          </div>

          <div className="flex flex-col gap-4 w-[80%]">
            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                className="w-full text-black text-sm px-3 py-1.5 placeholder:black border border-1 border-black 
            rounded-sm focus:outline focus:outline-gray-500"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="password"
                className="w-full text-black text-sm px-3 py-1.5 placeholder:black border border-1 border-black 
            rounded-sm focus:outline focus:outline-gray-500"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="w-full text-black text-sm px-3 py-1.5 placeholder:black border border-1 border-black 
            rounded-sm focus:outline focus:outline-gray-500"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-black text-white font-medium px-3 py-1.5 rounded-md border border-1
            hover:bg-white hover:text-black hover:border hover:border-1 hover:border-black transition duration-200"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>

          <div className="flex flex-row gap-2">
            <p className="text-sm">Already have an account?</p>
            <a
              className="text-sm font-semibold hover:underline active:font-bold cursor-pointer"
              href="/auth/signin"
            >
              Login
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
