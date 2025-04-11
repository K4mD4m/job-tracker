"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  application: JobApplication;
  onDelete: (id: string) => void;
  onEdit: (app: JobApplication) => void;
}

interface JobApplication {
  _id: string;
  company: string;
  position: string;
  status: string;
  dateApplied: string;
  notes?: string;
}

// Component to display a job application card with edit and delete functionality
export default function JobApplicationCard({
  application,
  onDelete,
  onEdit,
}: Props) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/job-applications/${application._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Application deleted.");
        onDelete(application._id);
      } else {
        toast.error("Failed to delete application.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting.");
      console.error("Error:", error);
    }
  };

  return (
    <Card className="bg-white shadow rounded-2xl relative">
      <CardContent className="p-6 space-y-3">
        <div className="flex justify-between items-start">
          <div className="w-full max-w-full">
            <div className="text-xl font-semibold break-words whitespace-normal overflow-wrap break-word word-break-all">
              {application.position}
            </div>
            <div className="text-gray-600 break-words whitespace-normal overflow-wrap break-word word-break-all">
              {application.company}
            </div>
            <div className="text-sm text-muted-foreground">
              Status: <span className="font-medium">{application.status}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Applied: {new Date(application.dateApplied).toLocaleDateString()}
            </div>
            {application.notes && (
              <div className="text-sm text-gray-700 break-words word-break-all whitespace-pre-wrap max-h-32 overflow-y-auto">
                Note: {application.notes}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(application)}
              title="Edit"
              className="cursor-pointer"
            >
              <Pencil size={16} />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={handleDelete}
              title="Delete"
              className="cursor-pointer"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
