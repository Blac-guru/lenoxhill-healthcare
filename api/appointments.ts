import type { VercelRequest, VercelResponse } from "@vercel/node";
import "../server/storage.js";
import { storage } from "../server/storage.js";
import { insertAppointmentSchema } from "../shared/schema.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const appointments = await storage.getAppointments();
      return res.status(200).json(appointments);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch appointments" });
    }
  }

  if (req.method === "POST") {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(validatedData);
      return res.status(201).json(appointment);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Invalid appointment data", error });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
