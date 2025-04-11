import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster richColors position="top-right" />
    </AuthProvider>
  );
}
