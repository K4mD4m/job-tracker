import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongoose";

// This API route is a test endpoint to check if the connection to MongoDB is successful
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    res.status(200).json({ message: "Successfully connected to MongoDB with Mongoose!" });
  } catch (error) {
    res.status(500).json({ message: "Connection failed", error: error.message });
  }
}

