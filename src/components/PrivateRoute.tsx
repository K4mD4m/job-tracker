import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

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
