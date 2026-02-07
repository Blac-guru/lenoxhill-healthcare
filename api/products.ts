import type { VercelRequest, VercelResponse } from "@vercel/node";
import "../server/storage.js";
import { storage } from "../server/storage.js";
import { fetchProductImage } from "../server/serpapi.js";

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
      const { category, targetAge, search } = req.query;
      const products = await storage.getProducts({
        category: category as string,
        targetAge: targetAge as string,
        search: search as string,
      });
      const hydratedProducts = await Promise.all(
        products.map(async (product) => {
          const shouldHydrate =
            !product.imageUrl || product.imageUrl.includes("unsplash.com");

          if (!shouldHydrate) {
            return product;
          }

          const imageUrl = await fetchProductImage(product.name);
          return {
            ...product,
            imageUrl: imageUrl ?? product.imageUrl,
          };
        }),
      );

      return res.status(200).json(hydratedProducts);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch products" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
