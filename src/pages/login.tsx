"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email === "demo@jobtracker.com" && password === "demo123") {
        setError("");
        login();
        router.push("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-muted flex items-center justify-center px-4">
        <div className="bg-background rounded-2xl shadow-xl w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Log in to JobTracker
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="demo@jobtracker.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                ></button>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 text-red-800 text-sm rounded-md px-4 py-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full text-lg py-6 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
