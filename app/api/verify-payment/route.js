import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getTierByMonths } from '../../../lib/pricing';

export async function POST(req) {
  // Created here, inside the request, not at module load time -- same fix
  // as create-order/route.js, so a missing env var at build time can't
  // crash the whole deploy.
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const body = await req.json();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id, months } = body;

  const monthsNum = Number(months);
  const tier = getTierByMonths(monthsNum);
  if (!tier) {
    return NextResponse.json({ success: false, error: 'Invalid pricing tier' }, { status: 400 });
  }

  // Recompute the signature ourselves -- proves the payment is real and
  // wasn't faked by calling this endpoint directly without actually paying.
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ success: false, error: 'Signature mismatch' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from('reports').insert({
    user_id,
    filename: null,
    status: 'pending',
    payment_id: razorpay_payment_id,
    amount_paid: tier.priceInr * 100, // stored in paise, derived from the validated tier -- not client input
    months_back: monthsNum,
  });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
