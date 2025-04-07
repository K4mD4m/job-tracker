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

export default function AddJobApplication() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        toast.success("Job application added successfully!");
        reset(); // Reset forumlarza po udanym dodaniu aplikacji
      } else {
        toast.error("Error adding job application.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4">
      <div className="bg-background rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add a Job Application
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="company">
              Company
            </label>
            <Input
              id="company"
              type="text"
              placeholder="Company name"
              {...register("company")}
            />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company.message}</p>
            )}
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
            />
            {errors.position && (
              <p className="text-red-500 text-sm">{errors.position.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="status">
              Status
            </label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value} // Zapewniamy, że wartość jest przekazywana
                  onValueChange={(value) => field.onChange(value)} // Używamy onChange do aktualizacji wartości
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">applied</SelectItem>
                    <SelectItem value="interview">interview</SelectItem>
                    <SelectItem value="rejected">rejected</SelectItem>
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
            <Input id="dateApplied" type="date" {...register("dateApplied")} />
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
            className="w-full text-lg py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Application"}
          </Button>
        </form>
      </div>
    </div>
  );
}
