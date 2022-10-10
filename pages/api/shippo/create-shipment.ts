import type { NextApiHandler } from "next";
const shippo = require("shippo")(process.env.SHIPPO_API_KEY);

const CreateShipment: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  try {
    const { cart } = req.body;
    const shipment = shippo.shipment.create({
      address_from: {
        
      }
    })
  } catch(err) {
    console.error(err);
  }
}