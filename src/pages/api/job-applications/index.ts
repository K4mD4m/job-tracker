import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongoose";
import JobApplication from "../../../models/JobApplication";

// This API route handles GET and POST requests for job applications
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
  } catch (err) {
    console.error("❌ Database connection failed in API:", err);
    return res.status(500).json({ message: "Database connection failed" });
  }

  if (req.method === "GET") {
    try {
      const applications = await JobApplication.find(); // fetch all job applications from the database
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching job applications", error });
    }
  } else if (req.method === "POST") {
    try {
      const { company, position, status, dateApplied, notes } = req.body;
      const newApplication = new JobApplication({ company, position, status, dateApplied, notes });
      await newApplication.save();
      res.status(201).json(newApplication);
    } catch (error) {
      res.status(500).json({ message: "Error creating job application", error });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

