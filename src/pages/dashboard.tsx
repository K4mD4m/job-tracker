"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import PrivateRoute from "@/components/PrivateRoute";
import AddJobApplication from "@/components/AddJobApplication";
import JobApplicationCard from "@/components/JobApplicationCard";
import EditJobApplicationModal from "@/components/EditJobApplicationModal";
import SearchFilterBar from "@/components/SearchFilterBar";
import Pagination from "@/components/Pagination";

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }

    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/job-applications");
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        toast.error("Failed to fetch job applications");
      } finally {
        setIsLoading(false);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Logika filtrowania aplikacji
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter; // Jeśli "all" to brak filtra

    return matchesSearch && matchesStatus;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentApplications = filteredApplications.slice(startIndex, endIndex);

  // Funkcja do zmiany widoczności formularza
  const toggleFormVisibility = () => {
    setIsAddFormVisible((prev) => !prev);
  };

  return (
    <PrivateRoute>
      <main className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Your Applications
        </h1>

        {/* Przycisk do wyświetlania formularza */}
        <div className="text-center">
          <button
            onClick={toggleFormVisibility}
            className="mb-6 px-4 py-2 bg-black text-white rounded-md cursor-pointer"
          >
            {isAddFormVisible ? "Close Form" : "Add New Application"}
          </button>
        </div>

        {/* Wyświetlanie formularza, jeśli isAddFormVisible jest true */}
        {isAddFormVisible && (
          <AddJobApplication
            onAddJobApplication={addJobApplication}
            closeForm={() => setIsAddFormVisible(false)} // Funkcja do zamykania formularza
          />
        )}

        <div className="mb-6">
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-10 w-10 text-black animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentApplications.map((app) => (
                <JobApplicationCard
                  key={app._id}
                  application={app}
                  onDelete={deleteJobApplication}
                  onEdit={handleEdit}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={applications.length}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

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
