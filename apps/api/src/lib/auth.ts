import { betterAuth } from "better-auth";

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret) {
  throw new Error("BETTER_AUTH_SECRET environment variable is required");
}

export const auth = betterAuth({
  secret,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3001",
  emailAndPassword: {
    enabled: true,
  },
});
