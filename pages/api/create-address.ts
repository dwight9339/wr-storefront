import { NextApiHandler } from "next";
import axios from "axios";

const CreateAddress: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") return res.status(405);

  try {
    const { address } = req.body;
    const { data } = await axios.post("https://api.goshippo.com/addresses", {
      ...address,
      validate: true
    }, {
      headers: {
        "Authorization": `ShippoToken ${process.env.SHIPPO_API_KEY}`
      }
    });
    console.log(`Response: ${JSON.stringify(data)}`);

    return res.status(200).json({
      addressId: data.object_id,
      isValid: data.validation_results.is_valid
    });
  } catch(err: any) {
    console.error(err);
    return res.status(err.status || 500).send(err.message || "Internal server error");
  }
}

export default CreateAddress;