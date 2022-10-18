import { Cart, LineItem } from "@medusajs/medusa";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function createCheckout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405);

  try {
    const cart: Cart = req.body.cart;
    const { origin } = req.headers;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${origin}/checkout-results`,
      cancel_url: `${origin}/checkout-results`,
      line_items: [
        ...cart.items.map((item: LineItem) => {
          return {
            price_data: {
              currency: cart.region.currency_code,
              product_data: {
                name: item.title,
                description: item.variant.title,
                images: [item.thumbnail]
              },
              unit_amount: item.total,
              quantity: item.quantity
            }
          }
        }),
        {
          price_data: {
            currency: cart.region.currency_code,
            product_data: {
              name: "Shipping",
              description: `${cart.shipping_methods[0].data.provider}`,
              images: [cart.shipping_methods[0].data.provider_image_200]
            },
            unit_amount_decimal: cart.shipping_methods[0].data.amount
          }
        }
      ]
    });

    res.status(200).json({redirect_url: session.url});
  } catch(err: any) {
    res.status(err.status || 500).json({message: err.message || "Internal server error"});
  }
}