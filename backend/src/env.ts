import { z } from "zod";

// Define the schema for the environment variables
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  WEB_BASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3333),
});

// add --env file .env to the start script in package.json

export const env = envSchema.parse(process.env);
