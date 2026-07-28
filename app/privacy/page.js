import Link from 'next/link';

export const metadata = { title: 'Privacy Policy — ProBroker.ai' };

export default function PrivacyPage() {
  return (
    <div style={wrap}>
      <div style={inner}>
        <Link href="/" style={backLink}>← Back to ProBroker.ai</Link>
        <h1 style={h1}>Privacy Policy</h1>
        <p style={updated}>Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h2 style={h2}>Who we are</h2>
        <p style={p}>ProBroker.ai is operated by Arsh Realty ("we", "us"). We provide a service that converts
          WhatsApp group chat exports into structured property-listing reports (the "Service"). This policy
          explains what data we collect when you use the Service, why, and what your rights are.</p>

        <h2 style={h2}>What we collect</h2>
        <p style={p}><b>Directly from you:</b> your name, email address, and payment details (processed by
          Razorpay, our payment provider — we never see or store your card/UPI details ourselves).</p>
        <p style={p}><b>In the file you upload:</b> the WhatsApp chat export you provide, which may contain
          messages, names, and phone numbers of third parties (other members of your WhatsApp group) who have
          not directly interacted with us.</p>

        <h2 style={h2}>Why we collect it</h2>
        <p style={p}>To generate the structured report and match analysis you've paid for, to process your
          payment, and to contact you about your order. We do not use uploaded chat content for any purpose
          beyond generating your report, and we never sell, rent, or share it with any third party for
          marketing or any other purpose.</p>

        <h2 style={h2}>Third parties involved in processing your data</h2>
        <p style={p}>To provide the Service, parts of your data pass through: our AI processing provider
          (to extract structured listings from chat text), Razorpay (to process payment — they never share
          your card/UPI details with us), and Supabase (where uploaded files and reports are stored, encrypted,
          until deleted per our retention schedule below).</p>

        <h2 style={h2}>How long we keep it</h2>
        <p style={p}><b>Raw uploaded chat files:</b> deleted within 7 days of your report being delivered.<br/>
          <b>Generated reports:</b> retained for 90 days so you can re-download, then deleted.<br/>
          <b>Payment records:</b> retained as required by Indian tax/accounting law.</p>
        <p style={p}>You can request earlier deletion of any of the above at any time — see "Your rights" below.</p>

        <h2 style={h2}>Security measures</h2>
        <p style={p}>All data in transit is encrypted (HTTPS). Uploaded files and reports are stored encrypted
          at rest. Access to stored data is limited to personnel who need it to operate the Service. We do not
          store payment card details on our systems.</p>

        <h2 style={h2}>Your rights</h2>
        <p style={p}>Under India's Digital Personal Data Protection Act, you have the right to ask what data
          of yours we hold, request correction of inaccurate data, request deletion of your data (subject to
          what we're legally required to retain, e.g. payment records), and withdraw consent for future
          processing. To exercise any of these, contact us at{' '}
          <a href="mailto:arshrealty.co@gmail.com" style={link}>arshrealty.co@gmail.com</a>.</p>

        <h2 style={h2}>About third-party data in your upload</h2>
        <p style={p}>If you upload a WhatsApp export containing other people's personal information (names,
          numbers, messages), you confirm that you have the right to share that data with us for the purpose
          of generating your report — for instance, because it's a business group you administer or
          participate in for professional purposes. We process this data solely to generate your report and
          delete it per the retention schedule above.</p>

        <h2 style={h2}>Changes to this policy</h2>
        <p style={p}>We may update this policy from time to time. Material changes will be notified via email
          or a website notice before taking effect.</p>

        <h2 style={h2}>Contact us</h2>
        <p style={p}>Questions about this policy or your data:{' '}
          <a href="mailto:arshrealty.co@gmail.com" style={link}>arshrealty.co@gmail.com</a></p>
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
