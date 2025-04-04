import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Połącz z bazą danych
    const { db } = await connectToDatabase();

    // Test
    await db.collection("test").insertOne({ message: "Connection successful!" });

    res.status(200).json({ message: "Successfully connected to the database!" });
  } catch (error) {
    res.status(500).json({ message: "Connection failed", error: error.message });
  }
}
