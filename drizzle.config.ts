/** @type {import('drizzle-kit').Config} */
var config = {
  schema: "./lib/supabase/schema.ts",
  out: "./supabase/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  },
  verbose: true,
  strict: true,
};

require('dotenv').config({ path: '.env.local' });
module.exports = config;

