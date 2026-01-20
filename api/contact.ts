import type { VercelRequest, VercelResponse } from "@vercel/node";
import "../server/storage.js";
import { storage } from "../server/storage.js";
import { insertContactMessageSchema } from "../shared/schema.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      return res.status(201).json(message);
    } catch (error) {
      return res.status(400).json({ message: "Invalid contact data", error });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
