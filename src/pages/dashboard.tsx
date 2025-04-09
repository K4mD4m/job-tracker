"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PrivateRoute from "@/components/PrivateRoute";
import AddJobApplication from "@/components/AddJobApplication";
import JobApplicationCard from "@/components/JobApplicationCard";
import EditJobApplicationModal from "@/components/EditJobApplicationModal";

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
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
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

  const addJobApplication = (newApp: JobApplication) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  const deleteJobApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app._id !== id));
  };

  const editJobApplication = async (updatedApp: JobApplication) => {
    // Wyślij zaktualizowane dane do serwera
    try {
      const res = await fetch(`/api/job-applications/${updatedApp._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedApp),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app._id === updatedApp._id ? updatedApp : app))
        );
        toast.success("Application updated successfully!");
      } else {
        toast.error("Failed to update application.");
      }
    } catch (error) {
      toast.error("An error occurred while updating.");
    }
  };

  const handleEdit = (application: JobApplication) => {
    setSelectedApp(application);
    setIsModalOpen(true);
  };

  return (
    <PrivateRoute>
      <main className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Your Applications
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <JobApplicationCard
              key={app._id}
              application={app}
              onDelete={deleteJobApplication}
              onEdit={handleEdit}
            />
          ))}
        </div>
        <AddJobApplication onAddJobApplication={addJobApplication} />
      </main>

      {/* Modal */}
      {selectedApp && (
        <EditJobApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={editJobApplication}
          application={selectedApp}
        />
      )}
    </PrivateRoute>
  );
}
