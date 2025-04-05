import mongoose, { Schema, Document } from "mongoose";

export interface IJobApplication extends Document {
  company: string;
  position: string;
  status: "applied" | "interview" | "rejected";
  dateApplied: Date;
  notes?: string;
}

// Schemat Mongoose
const JobApplicationSchema = new Schema<IJobApplication>(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    status: { type: String, enum: ["applied", "interview", "rejected"], required: true },
    dateApplied: { type: Date, required: true, default: Date.now },
    notes: { type: String },
  },
  { timestamps: true }
);

const JobApplication =
  mongoose.models.JobApplication || mongoose.model<IJobApplication>("JobApplication", JobApplicationSchema);

export default JobApplication;
