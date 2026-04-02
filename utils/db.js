import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

let db;

if (typeof window === "undefined") {
  const sql = neon(process.env.DATABASE_URL);

  db = drizzle(sql, {
    schema,
    disableWarningInBrowsers: true
  });
}

export { db };