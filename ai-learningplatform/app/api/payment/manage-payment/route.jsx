import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

   
const returnUrl = process.env.HOST_URL || "http://localhost:3000/dashboard";

const {customerId} = await req.json();

const portalSession = await stripe.billingPortal.sessions.create({
  customer: customerId,
  return_url: returnUrl,
});

return NextResponse.json(portalSession)
}

