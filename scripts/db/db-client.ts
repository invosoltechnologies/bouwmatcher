/**
 * Direct PostgreSQL client for migrations
 * Uses pg library for direct SQL execution
 */

import { Client } from 'pg';

let client: Client | null = null;

/**
 * Get database connection string from Supabase URL
 */
export function getConnectionString(): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  // Extract project ref from Supabase URL
  // Format: https://[project-ref].supabase.co
  const match = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/);
  if (!match) {
    throw new Error('Invalid Supabase URL format');
  }

  const projectRef = match[1];

  // Check for direct connection string in env
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // Construct connection string
  // Note: You need to get your actual connection string from Supabase Dashboard
  // Settings > Database > Connection string > Direct connection
  console.warn('\n⚠️  Warning: Using constructed connection string');
  console.warn('   For production, set DATABASE_URL in your .env file');
  console.warn('   Get it from: Supabase Dashboard > Settings > Database > Connection string\n');

  return `postgresql://postgres:[YOUR-PASSWORD]@db.${projectRef}.supabase.co:5432/postgres`;
}

/**
 * Connect to database
 */
export async function connect(): Promise<Client> {
  if (client) {
    return client;
  }

  const connectionString = getConnectionString();

  client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false // Supabase uses SSL
    }
  });

  await client.connect();
  return client;
}

/**
 * Disconnect from database
 */
export async function disconnect(): Promise<void> {
  if (client) {
    await client.end();
    client = null;
  }
}

/**
 * Execute SQL query
 */
export async function query(sql: string, params?: any[]): Promise<any> {
  const db = await connect();
  return db.query(sql, params);
}

/**
 * Execute multiple SQL statements in a transaction
 */
export async function executeInTransaction(statements: string[]): Promise<void> {
  const db = await connect();

  try {
    await db.query('BEGIN');

    for (const statement of statements) {
      if (statement.trim()) {
        await db.query(statement);
      }
    }

    await db.query('COMMIT');
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
}
