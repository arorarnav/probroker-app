import Link from 'next/link';

export const metadata = { title: 'Contact Us — ProBroker.ai' };

export default function ContactPage() {
  return (
    <div style={wrap}>
      <div style={inner}>
        <Link href="/" style={backLink}>← Back to ProBroker.ai</Link>
        <h1 style={h1}>Contact Us</h1>
        <p style={p}>ProBroker.ai is operated by Arsh Realty. For any question about your report, a payment,
          a refund request, or anything else — reach out and we'll respond as quickly as we can.</p>

        <div style={card}>
          <div style={cardLabel}>Email</div>
          <a href="mailto:arshrealty.co@gmail.com" style={cardValue}>arshrealty.co@gmail.com</a>
        </div>

        <p style={{ ...p, marginTop: 28 }}>For a failed or delayed report, please include your registered
          email address and, if you have it, the report ID shown on your dashboard — this helps us find your
          order faster.</p>
      </div>
    </div>
  );
}

const wrap = { minHeight: '100vh', background: '#0B0A08', color: '#F5F1E7', fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif", padding: '48px 20px' };
const inner = { maxWidth: 620, margin: '0 auto' };
const backLink = { color: 'rgba(245,241,231,0.6)', fontSize: 14, textDecoration: 'none', display: 'inline-block', marginBottom: 28 };
const h1 = { fontSize: 32, fontWeight: 700, margin: '0 0 20px' };
const p = { fontSize: 15, lineHeight: 1.7, color: 'rgba(245,241,231,0.85)', margin: '0 0 4px' };
const card = { background: '#151310', border: '1px solid rgba(166,124,61,0.3)', borderRadius: 12, padding: 24, marginTop: 24 };
const cardLabel = { fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(245,241,231,0.5)', marginBottom: 8 };
const cardValue = { fontSize: 20, fontWeight: 700, color: '#D9AD5F', textDecoration: 'none' };
