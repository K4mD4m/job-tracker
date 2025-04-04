import { MongoClient, Db } from "mongodb";

// URI połączenia z MongoDB (z MongoDB Atlas)
const uri = process.env.MONGODB_URI!;
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  // Jeśli jest już połączenie, zwróć zapisany klienta i bazę
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Nowe połączenie do bazy
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(); // Zwracamy bazę danych

  // Zapisujemy połączenie w cache
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}