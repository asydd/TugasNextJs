import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "public/data/booking.json");
const getBookings = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(getBookings());
  } else if (req.method === "POST") {
    const bookings = getBookings();
    const newBooking = { id: Date.now(), ...req.body };
    bookings.push(newBooking);
    fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));
    res.status(201).json(newBooking);
  }
}
