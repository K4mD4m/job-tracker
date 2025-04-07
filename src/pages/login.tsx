"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Sprawdzenie poprawności danych logowania
    if (email === "demo@jobtracker.com" && password === "demo123") {
      setError(""); // Resetowanie błędu, jeśli dane są poprawne

      // Zapisujemy użytkownika jako zalogowanego w localStorage
      localStorage.setItem("isLoggedIn", "true");

      // Przekierowanie do Dashboard
      router.push("/dashboard");
    } else {
      // W przypadku błędu logowania, ustawiamy komunikat
      setError("Invalid email or password.");
    }
  };

  return (
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
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-800 text-sm rounded-md px-4 py-2">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full text-lg py-6">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
