import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongoose";
import JobApplication from "../../../models/JobApplication";

// This API route handles DELETE and PATCH requests for job applications
// It connects to the database, finds the job application by ID, and either deletes or updates it
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const { id } = req.query;

  // Check if the ID is valid
  if (req.method === "DELETE") {
    try {
      const deleted = await JobApplication.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: "Job application not found" });

      res.status(200).json({ message: "Job application deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting job application", error });
    }
  }

  else if (req.method === "PATCH") {
    try {
      const updated = await JobApplication.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: "Job application not found" });

      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: "Error updating job application", error });
    }
  }

  else {
    res.setHeader("Allow", ["DELETE", "PATCH"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
