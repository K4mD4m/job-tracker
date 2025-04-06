import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[100vh] flex items-center justify-center text-center overflow-hidden">
      {/* Tło */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/herosection2.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/* Treść */}
      <div className="z-10 text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Track your job applications with ease
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6">
          Stay organized and never lose track of your job hunt.
        </p>
        <Link href="/login">
          <Button size="lg" variant="secondary" className="cursor-pointer">
            Try Demo
          </Button>
        </Link>
      </div>
    </section>
  );
}
