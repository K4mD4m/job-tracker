import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongoose";
import JobApplication from "../../models/JobApplication";

// API do GET i POST
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase(); 

  if (req.method === "GET") {
    try {
      const applications = await JobApplication.find(); // Pobiera wszystkie aplikacje
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching job applications", error });
    }
  } else if (req.method === "POST") {
    try {
      const { company, position, status, dateApplied, notes } = req.body;
      const newApplication = new JobApplication({ company, position, status, dateApplied, notes });
      await newApplication.save(); // Zapis do bazy
      res.status(201).json(newApplication);
    } catch (error) {
      res.status(500).json({ message: "Error creating job application", error });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
