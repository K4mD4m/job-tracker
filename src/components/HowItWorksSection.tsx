import { Search, ClipboardList, Check, UserCheck } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="bg-primary text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="flex flex-col items-center text-center">
            <Search className="w-10 h-10 text-white mb-4" />
            <h3 className="text-xl font-semibold mb-2">Find Jobs</h3>
            <p className="text-gray-300">
              Discover and save job postings that catch your eye.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <ClipboardList className="w-10 h-10 text-white mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-300">
              Stay updated on every application, from draft to offer.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Check className="w-10 h-10 text-white mb-4" />
            <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
            <p className="text-gray-300">
              All your applications in one clean, accessible dashboard.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <UserCheck className="w-10 h-10 text-white mb-4" />
            <h3 className="text-xl font-semibold mb-2">Get Hired</h3>
            <p className="text-gray-300">
              Simplify your job hunt and land your next role faster.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
