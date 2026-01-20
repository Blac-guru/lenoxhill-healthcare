import type { VercelRequest, VercelResponse } from "@vercel/node";
import "../server/storage.js";
import { storage } from "../server/storage.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const services = await storage.getServices();
      return res.status(200).json(services);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch services" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
