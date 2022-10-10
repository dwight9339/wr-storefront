import { NextApiHandler } from "next";
import axios from "axios";

const CreateAddress: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") return res.status(405);

  try {
    const { address } = req.body;
    const { data } = await axios.post("https://api.goshippo.com/addresses", {...address}, {
      headers: {
        "Authorization": `ShippoToken ${process.env.SHIPPO_API_KEY}`
      }
    });
    console.log(`Response: ${JSON.stringify(data)}`);

    return res.status(200).json({id: data.object_id});
  } catch(err: any) {
    console.error(err);
    return res.status(err.status || 500).send(err.message || "Internal server error");
  }
}

export default CreateAddress;