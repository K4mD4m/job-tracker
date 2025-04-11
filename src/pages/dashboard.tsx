"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import PrivateRoute from "@/components/PrivateRoute";
import AddJobApplication from "@/components/AddJobApplication";
import JobApplicationCard from "@/components/JobApplicationCard";
import EditJobApplicationModal from "@/components/EditJobApplicationModal";
import SearchFilterBar from "@/components/SearchFilterBar";
import Pagination from "@/components/Pagination";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface JobApplication {
  _id: string;
  company: string;
  position: string;
  status: string;
  dateApplied: string;
  notes?: string;
}

export default function Dashboard() {
  const [applications, setApplications] = useState<JobApplication[]>([]); // State to hold job applications
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null); // State to hold the selected job application for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [statusFilter, setStatusFilter] = useState<string>("all"); // State for status filter
  const [currentPage, setCurrentPage] = useState(1); // State for current page in pagination
  const [pageSize] = useState(6); // State for page size in pagination
  const [isLoading, setIsLoading] = useState(true); // State to control loading state
  const [isAddFormVisible, setIsAddFormVisible] = useState(false); // State to control the visibility of the add job application form

  const MAX_APPLICATIONS = 30; // Maximum number of job applications allowed

  // Fetch job applications from the API when the component mounts
  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/job-applications");
        const data = await res.json();
        setApplications(data);
      } catch (error) {
        toast.error("Failed to fetch job applications");
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Function to add a new job application
  const addJobApplication = (newApp: JobApplication) => {
    if (applications.length >= MAX_APPLICATIONS) {
      toast.error("Limit reached: max 30 applications.");
      return;
    }
    setApplications((prev) => [newApp, ...prev]);
  };

  // Function to delete a job application
  const deleteJobApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app._id !== id));
  };

  // Function to edit a job application
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
      console.error("Error:", error);
    }
  };

  // Function to handle editing a job application
  const handleEdit = (application: JobApplication) => {
    setSelectedApp(application);
    setIsModalOpen(true);
  };

  // Function to handle page change in pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Filter applications based on search query and status filter
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentApplications = filteredApplications.slice(startIndex, endIndex);

  const toggleFormVisibility = () => {
    setIsAddFormVisible((prev) => !prev);
  };

  return (
    <PrivateRoute>
      <Navbar />
      <main className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Welcome to your Dashboard!
        </h1>

        {applications.length < MAX_APPLICATIONS && (
          <div className="text-center">
            <button
              onClick={toggleFormVisibility}
              className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full hover:bg-gray-700 transition text-4xl cursor-pointer"
            >
              +
            </button>
          </div>
        )}

        {isAddFormVisible && (
          <AddJobApplication
            onAddJobApplication={addJobApplication}
            closeForm={() => setIsAddFormVisible(false)}
          />
        )}

        <div className="mb-6">
          <div className="bg-white p-4 rounded-lg shadow text-center font-medium text-lg">
            Jobs you’ve applied for: {applications.length}
          </div>
        </div>

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

            {applications.length === 0 && !isLoading && (
              <div className="text-center my-20">
                <p className="text-lg text-gray-600">
                  You haven’t added any job applications yet.
                </p>
              </div>
            )}

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
      <Footer />
    </PrivateRoute>
  );
}
