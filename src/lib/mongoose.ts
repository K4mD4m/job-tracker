import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

const globalWithMongoose = global as typeof global & { mongooseCache?: MongooseCache };

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongooseCache;

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "jobtracker",
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,        
    }).then((mongoose) => mongoose.connection)
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}




