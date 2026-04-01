import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",          // Output folder for generated files
  dialect: "postgresql",     // Database type
  schema: "./utils/schema.js", // Path to your schema
    dbCredentials:{
        url:'postgresql://neondb_owner:npg_jMK4cVGEPH8L@ep-quiet-thunder-a4a0b3hx-pooler.us-east-1.aws.neon.tech/ai-interview-mocker?sslmode=require&channel_binding=require'
    }
});