import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Create Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Log the connection string (remove in production)
console.log("Connecting to database with URL:", process.env.DATABASE_URL.replace(/:[^:@]{1,}@/, ':***@'));

const queryClient = postgres(process.env.DATABASE_URL, {
  ssl: {
    rejectUnauthorized: false
  },
  max: 1,
  idle_timeout: 20,
  connect_timeout: 20,
  preparation_timeout: 20,
  keepalive: true
});

export const db = drizzle(queryClient, {
  logger: true
});

// Test the connection
async function testConnection() {
  try {
    const result = await queryClient`SELECT 1`;
    console.log("Database connection test successful:", result);
  } catch (error) {
    console.error("Database connection test failed:", error);
  }
}

// Run the test when the module loads
testConnection();
