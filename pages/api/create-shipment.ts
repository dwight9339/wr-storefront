import { NextApiHandler } from "next";
import axios from "axios";

const CreateShipment: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") return res.status(405);

  try {
    const { addressId, items } = req.body;
    const { data } = await axios.post("https://api.goshippo.com/shipments", {
      address_from: process.env.SHIPPO_FROM_ADDRESS_ID,
      address_to: addressId,
      parcels: items
    }, {
      headers: {
        "Authorization": `ShippoToken ${process.env.SHIPPO_API_KEY}`
      }
    });

    return res.status(200).json({rates: data.rates});
  } catch(err: any) {
    console.error(err);
    return res.status(err.status || 500).send(err.message || "Internal server error");
  }
}

export default CreateShipment;