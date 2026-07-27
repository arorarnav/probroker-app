import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';
import { getTierByMonths } from '../../../lib/pricing';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  const body = await req.json();
  const months = Number(body.months);

  // The price is looked up server-side from the requested months -- never
  // accept an amount directly from the browser, or anyone could pay
  // whatever they want by editing the request.
  const tier = getTierByMonths(months);
  if (!tier) {
    return NextResponse.json({ error: 'Invalid pricing tier' }, { status: 400 });
  }

  const amountPaise = tier.priceInr * 100;

  try {
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: `report_${months}mo_${Date.now()}`,
      notes: { months: String(months) }, // carried through so verify-payment can double-check later
    });
    return NextResponse.json(order);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
