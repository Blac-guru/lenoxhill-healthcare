import type { VercelRequest, VercelResponse } from "@vercel/node";
import "../../server/storage.js";
import { storage } from "../../server/storage.js";
import { insertCartItemSchema } from "../../shared/schema.js";

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
      const validatedData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(validatedData);
      return res.status(201).json(cartItem);
    } catch (error) {
      return res.status(400).json({ message: "Invalid cart item data", error });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
