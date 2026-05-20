//import { betterAuth } from "better-auth";
//import { MongoClient } from "mongodb";
//import { mongodbAdapter } from "better-auth/adapters/mongodb";
//const client = new MongoClient(process.env.PRITTYCATS_DB);
//const db = client.db("prittycats");
//export const auth = betterAuth({
//  database: mongodbAdapter(db, {
//    // Optional: if you don't provide a client, database transactions won't be enabled.
//    client,
//  }),
//  emailAndPassword: {
//    enabled: true,
//  },
//  socialProviders: {
//    google: {
//      clientId: process.env.GOOGLE_CLIENT_ID,
//      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//    },
//  },
//});
//




// lib/auth.js
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Vercel এ যদি এনভায়রনমেন্ট ভেরিয়েবল না পায় তবে খালি স্ট্রিং ধরে নেবে
const dbUri = process.env.PRITTYCATS_DB || ""; 

const client = new MongoClient(dbUri);
const db = client.db("prittycats");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});