import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 py-4 bg-primary text-white shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-white">
          JobTracker
        </Link>
        {/* Menu na większych ekranach */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/login">
            <Button
              variant="outline"
              className="cursor-pointer px-6 py-3 text-lg text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              Login
            </Button>
          </Link>
        </nav>

        {/* Hamburger menu na mniejszych ekranach */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "X" : "☰"}
        </button>
      </div>

      {/* Rozwijane menu na małych ekranach */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-4">
          <Link href="/login">
            <Button
              variant="outline"
              className="cursor-pointer px-6 py-3 text-lg text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              Login
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
