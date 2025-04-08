"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import PrivateRoute from "@/components/PrivateRoute";
import AddJobApplication from "@/components/AddJobApplication";

interface JobApplication {
  _id: string;
  company: string;
  position: string;
  status: string;
  dateApplied: string;
  notes?: string;
}

const isLoggedIn = () =>
  typeof window !== "undefined" &&
  localStorage.getItem("isLoggedIn") === "true";

export default function Dashboard() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login"); // Jeśli użytkownik nie jest zalogowany, przekieruj na login
      return;
    }

    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/job-applications");
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        toast.error("Failed to fetch job applications");
      }
    };

    fetchApplications();
  }, [router]);

  // Funkcja do dodawania nowej aplikacji
  const addJobApplication = (newApp: JobApplication) => {
    setApplications((prevApplications) => [newApp, ...prevApplications]);
  };

  return (
    <PrivateRoute>
      <main className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Your Applications
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <Card key={app._id} className="bg-white shadow rounded-2xl">
              <CardContent className="p-6 space-y-3">
                <div className="text-xl font-semibold">{app.position}</div>
                <div className="text-gray-600">{app.company}</div>
                <div className="text-sm text-muted-foreground">
                  Status: <span className="font-medium">{app.status}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Applied: {new Date(app.dateApplied).toLocaleDateString()}
                </div>
                {app.notes && (
                  <div className="text-sm text-gray-700">Note: {app.notes}</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <AddJobApplication onAddJobApplication={addJobApplication} />
      </main>
    </PrivateRoute>
  );
}
