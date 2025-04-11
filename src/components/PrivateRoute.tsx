import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

// Component to protect routes that require authentication
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  // Check if the user is logged in, if not redirect to login page
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  // Show a loading spinner while checking authentication status
  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-40 mt-24">
        <Loader2 className="h-10 w-10 text-black animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
