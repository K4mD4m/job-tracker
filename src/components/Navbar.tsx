import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  // Function to handle logout
  const handleLogout = () => {
    logout();
    toast.success("You have successfully logged out!");
  };

  return (
    <header className="w-full px-4 py-4 bg-primary text-white shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-white">
          JobTracker 💼
        </Link>

        {/* Menu for larger screens */}
        <nav className="hidden md:flex space-x-6 items-center">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="cursor-pointer px-6 py-3 text-lg text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="cursor-pointer px-6 py-3 text-lg text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button
                variant="outline"
                className="cursor-pointer px-6 py-3 text-lg text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Hamburger menu for smaller screens */}
        <button
          className="md:hidden text-2xl text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "X" : "☰"}
        </button>
      </div>

      {/* Dropdown menu for smaller screens */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col items-center space-y-4 absolute top-16 right-0 w-full rounded-lg z-50 bg-black/90 shadow-lg p-6"
          >
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="cursor-pointer px-6 py-3 text-lg text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="cursor-pointer px-6 py-3 text-lg text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="cursor-pointer px-6 py-3 text-lg text-primary border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  Login
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
