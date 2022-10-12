import { NextApiHandler } from "next";
import axios from "axios";

const CreateShipment: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") return res.status(405);

  try {
    const { addressId, items } = req.body;
    const { data } = await axios.post("https://api.goshippo.com/shipments", {
      fromAddress: {
        name: "David White",
        street1: "1 Aspen Dr",
        city: "Loveland",
        state: "CO",
        zip: "80634",
        country: "US",
        email: "whited9339@gmail.com"
      }, 
      toAddress: addressId,
      parcels: items.map((item: any) => ({
        length: item.length,
        width: item.width,
        height: item.height,
        distance_unit: "in",
        weight: item.weight,
        mass_unit: "lb"
      }))
    }, {
      headers: {
        "Authorization": `ShippoToken ${process.env.SHIPPO_API_KEY}`
      }
    });
    console.log(`Response: ${JSON.stringify(data)}`);

    return res.status(200).json({options: data.rates});
  } catch(err: any) {
    console.error(err);
    return res.status(err.status || 500).send(err.message || "Internal server error");
  }
}

export default CreateShipment;