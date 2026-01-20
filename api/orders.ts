import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../server/storage";
import { insertOrderSchema } from "../shared/schema";

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
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      return res.status(201).json(order);
    } catch (error) {
      return res.status(400).json({ message: "Invalid order data", error });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
