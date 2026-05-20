
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://pet-adoption-theta-ten.vercel.app", 
});

export const { signIn, signUp, useSession } = authClient;