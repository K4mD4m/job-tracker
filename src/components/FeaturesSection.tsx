import { CheckCircle } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          Streamline Your Job Search
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-12">
          With JobTracker, you can easily track your job applications, stay
          organized, and never lose sight of your progress. Focus on what
          matters – getting the job you want.
        </p>

        {/* Lista funkcji */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <CheckCircle className="w-8 h-8 text-primary mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Easy Tracking
            </h3>
            <p className="text-gray-600">
              Keep track of all your job applications in one place, making it
              easier to manage your job search.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <CheckCircle className="w-8 h-8 text-primary mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Stay Organized
            </h3>
            <p className="text-gray-600">
              Use categories and filters to stay on top of your progress and
              ensure no opportunity slips through the cracks.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <CheckCircle className="w-8 h-8 text-primary mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Reminders & Notes
            </h3>
            <p className="text-gray-600">
              Add custom notes, deadlines, and reminders to follow up on
              important applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
