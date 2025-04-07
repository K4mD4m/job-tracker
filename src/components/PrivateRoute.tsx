import { useEffect } from "react";
import { useRouter } from "next/router";

// PrivateRoute zabezpiecza dostęp do stron, tylko dla zalogowanych użytkowników
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      router.push("/login"); // Jeśli użytkownik nie jest zalogowany, przekieruj na login
    }
  }, [router]);

  return <>{children}</>;
};

export default PrivateRoute;
