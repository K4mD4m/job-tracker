"use client";

import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

interface JobApplication {
  _id: string;
  company: string;
  position: string;
  status: string;
  dateApplied: string;
  notes?: string;
}

interface EditJobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedApp: JobApplication) => void;
  application: JobApplication;
}

const EditJobApplicationModal: FC<EditJobApplicationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  application,
}) => {
  const [formData, setFormData] = useState<JobApplication>(application);

  useEffect(() => {
    setFormData(application);
  }, [application]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusChange = (value: string) => {
    setFormData({
      ...formData,
      status: value,
    });
  };

  const handleSave = async () => {
    if (formData.position && formData.company && formData.status) {
      try {
        const res = await fetch(`/api/job-applications/${formData._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          toast.success("Application updated successfully!");
          onSave(formData);
          onClose();
        } else {
          toast.error("Failed to update application.");
        }
      } catch (error) {
        toast.error("An error occurred while updating.");
      }
    } else {
      toast.error("Please fill all the fields!");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Job Application</h2>
              <button
                onClick={onClose}
                className="text-gray-600 text-2xl cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="position" className="block text-sm font-medium">
                  Position
                </label>
                <Input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium">
                  Company
                </label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium">
                  Status
                </label>
                <Select
                  value={formData.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied" className="cursor-pointer">
                      applied
                    </SelectItem>
                    <SelectItem value="interview" className="cursor-pointer">
                      interview
                    </SelectItem>
                    <SelectItem value="rejected" className="cursor-pointer">
                      rejected
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="dateApplied"
                  className="block text-sm font-medium"
                >
                  Date Applied
                </label>
                <Input
                  type="date"
                  id="dateApplied"
                  name="dateApplied"
                  value={formData.dateApplied}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium">
                  Notes
                </label>
                <Input
                  type="text"
                  id="notes"
                  name="notes"
                  value={formData.notes || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleSave}
                className="cursor-pointer"
              >
                Save Changes
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditJobApplicationModal;
