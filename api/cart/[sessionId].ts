import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../../server/storage";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { sessionId } = req.query;

  if (req.method === "GET") {
    try {
      const cartItems = await storage.getCartItems(sessionId as string);
      return res.status(200).json(cartItems);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch cart items" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await storage.clearCart(sessionId as string);
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: "Failed to clear cart" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
