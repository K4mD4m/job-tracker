import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function QuoteSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center border border-gray-200 rounded-2xl shadow-sm p-10">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-primary text-white p-3 rounded-full shadow-md mb-4">
            <Quote className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 italic leading-snug">
            Opportunities do not happen. You create them.
          </h2>
          <p className="text-sm text-gray-500 mt-3">— Chris Grosser</p>
        </div>

        <p className="text-gray-600 text-lg mb-6">
          Take the first step toward staying organized and landing your dream
          job.
        </p>

        <Link href="/login">
          <Button size="lg" className="text-base cursor-pointer">
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
}
