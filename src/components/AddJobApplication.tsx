"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";

const schema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  status: z.enum(["applied", "interview", "rejected"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
  dateApplied: z.string().min(1, "Date applied is required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface JobApplication {
  _id: string;
  company: string;
  position: string;
  status: string;
  dateApplied: string;
  notes?: string;
}

interface AddJobApplicationProps {
  onAddJobApplication: (newApp: JobApplication) => void;
  closeForm: () => void;
}

export default function AddJobApplication({
  onAddJobApplication,
  closeForm,
}: AddJobApplicationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyCharCount, setCompanyCharCount] = useState(0);
  const [positionCharCount, setPositionCharCount] = useState(0);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/job-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const newApp = await res.json(); // Pobierz nową aplikację z odpowiedzi serwera
        toast.success("Job application added successfully!");
        reset(); // Reset formularza po dodaniu aplikacji
        onAddJobApplication(newApp); // Przekaż nową aplikację do komponentu nadrzędnego
        closeForm(); // Zamknij formularz
      } else {
        toast.error("Error adding job application.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 150) {
      setCompanyCharCount(value.length);
    }
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 75) {
      setPositionCharCount(value.length);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={closeForm}
            className="absolute top-4 right-4 text-black font-bold text-2xl cursor-pointer"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold text-center mb-6">
            Add a Job Application
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="company"
              >
                Company
              </label>
              <Input
                id="company"
                type="text"
                placeholder="Company name"
                {...register("company")}
                maxLength={150}
                onChange={handleCompanyChange}
              />
              {errors.company && (
                <p className="text-red-500 text-sm">{errors.company.message}</p>
              )}
              <p className="text-sm text-gray-500">
                {companyCharCount}/150 characters
              </p>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="position"
              >
                Position
              </label>
              <Input
                id="position"
                type="text"
                placeholder="Position"
                {...register("position")}
                maxLength={75}
                onChange={handlePositionChange}
              />
              {errors.position && (
                <p className="text-red-500 text-sm">
                  {errors.position.message}
                </p>
              )}
              <p className="text-sm text-gray-500">
                {positionCharCount}/75 characters
              </p>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="status"
              >
                Status
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="dateApplied"
              >
                Date Applied
              </label>
              <Input
                id="dateApplied"
                type="date"
                {...register("dateApplied")}
              />
              {errors.dateApplied && (
                <p className="text-red-500 text-sm">
                  {errors.dateApplied.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="notes">
                Notes (Optional)
              </label>
              <Input
                id="notes"
                type="text"
                placeholder="Any additional notes?"
                {...register("notes")}
              />
              {errors.notes && (
                <p className="text-red-500 text-sm">{errors.notes.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full text-lg py-6 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Application"}
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
