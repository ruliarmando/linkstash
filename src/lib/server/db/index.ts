import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const pool = new Pool({
	connectionString: env.DATABASE_URL,
	ssl: env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
});

export const db = drizzle(pool, { schema });
