/**
 * @see https://www.npmjs.com/package/dotenv
 */
import dotenv from "dotenv";

export const ENV = process.env.NODE_ENV ;

// Loads environment variables
dotenv.config({ path: `./config/.env/.env.${ENV}` });

// Application
export const APP_NAME = process.env.APP_NAME ;