import Link from 'next/link';

export const metadata = { title: 'Refund & Cancellation Policy — ProBroker.ai' };

export default function RefundPolicyPage() {
  return (
    <div style={wrap}>
      <div style={inner}>
        <Link href="/" style={backLink}>← Back to ProBroker.ai</Link>
        <h1 style={h1}>Refund & Cancellation Policy</h1>
        <p style={updated}>Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h2 style={h2}>Before you upload a chat file</h2>
        <p style={p}>If you've paid for a report but haven't yet uploaded your WhatsApp chat file, you can
          request a full cancellation and refund at any time by emailing us. Refunds requested at this stage
          are processed within <b>5-7 business days</b> to your original payment method.</p>

        <h2 style={h2}>After you upload a chat file</h2>
        <p style={p}>Once you've uploaded your chat and processing has begun, we've committed real work to
          your order. If your report fails to generate for a genuine technical reason on our end, we will
          either reprocess it at no additional cost or issue a refund — whichever you prefer — within
          <b> 3-5 business days</b> of you contacting us.</p>

        <h2 style={h2}>If you're unhappy with your report</h2>
        <p style={p}>Because reports are generated from your own chat data using automated extraction, and
          quality depends heavily on how active and clear the source chat is, we review dissatisfaction
          requests on a case-by-case basis rather than offering an automatic refund. Email us within 7 days
          of receiving your report describing the specific issue, and we will respond within{' '}
          <b>3 business days</b> with either a corrected report or a refund decision.</p>

        <h2 style={h2}>How to request a refund or cancellation</h2>
        <p style={p}>Email <a href="mailto:arshrealty.co@gmail.com" style={link}>arshrealty.co@gmail.com</a> with
          your registered email address and order details. We aim to acknowledge every request within{' '}
          <b>24 hours</b>.</p>

        <h2 style={h2}>How refunds are processed</h2>
        <p style={p}>All approved refunds are issued to your original payment method via Razorpay. Depending
          on your bank, funds may take an additional 5-7 business days to reflect in your account after we
          initiate the refund.</p>
      </div>
    </div>
  );
}

const wrap = { minHeight: '100vh', background: '#0B0A08', color: '#F5F1E7', fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif", padding: '48px 20px' };
const inner = { maxWidth: 720, margin: '0 auto' };
const backLink = { color: 'rgba(245,241,231,0.6)', fontSize: 14, textDecoration: 'none', display: 'inline-block', marginBottom: 28 };
const h1 = { fontSize: 32, fontWeight: 700, margin: '0 0 6px' };
const updated = { fontSize: 13, color: 'rgba(245,241,231,0.5)', marginBottom: 36 };
const h2 = { fontSize: 19, fontWeight: 700, marginTop: 32, marginBottom: 10, color: '#D9AD5F' };
const p = { fontSize: 15, lineHeight: 1.7, color: 'rgba(245,241,231,0.85)', margin: '0 0 4px' };
const link = { color: '#D9AD5F', textDecoration: 'underline' };
