import Link from 'next/link';

export const metadata = { title: 'Terms & Conditions — ProBroker.ai' };

export default function TermsPage() {
  return (
    <div style={wrap}>
      <div style={inner}>
        <Link href="/" style={backLink}>← Back to ProBroker.ai</Link>
        <h1 style={h1}>Terms & Conditions</h1>
        <p style={updated}>Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <h2 style={h2}>1. The Service</h2>
        <p style={p}>ProBroker.ai ("we", "us", "the Service"), operated by Arsh Realty, converts a WhatsApp
          group chat export you provide into a structured Excel report — a Listings sheet and a Matches sheet
          identifying demand/supply pairings found within your own data. The Service is intended for
          business use by real estate brokers and similar professionals.</p>

        <h2 style={h2}>2. Pricing and payment</h2>
        <p style={p}>Reports are priced per the tiers shown on our pricing page at the time of purchase,
          based on how many months of chat history you select. Payment is processed securely through
          Razorpay in Indian Rupees (INR). Prices are subject to change; the price shown at the time you
          complete payment is the price that applies to that order.</p>

        <h2 style={h2}>3. Accuracy of extracted data</h2>
        <p style={p}>Reports are generated using automated language-processing technology applied to
          informal, user-generated chat content. While we aim for high accuracy, we do not guarantee that
          every listing, price, location, or contact detail extracted is complete or error-free. You are
          responsible for verifying any information in your report before relying on it commercially
          (e.g., before contacting a listed phone number or quoting a price to a client).</p>

        <h2 style={h2}>4. Your responsibilities</h2>
        <p style={p}>By uploading a chat export, you confirm you have the right to share its contents with
          us (e.g., because you administer or participate in that group for business purposes), and that you
          will use the delivered report for lawful, legitimate business purposes only.</p>

        <h2 style={h2}>5. Delivery timelines</h2>
        <p style={p}>We aim to deliver every report within 24 hours of successful payment and file upload.
          In rare cases (unusually large files, technical issues) delivery may take longer; we will contact
          you by email if this happens.</p>

        <h2 style={h2}>6. Limitation of liability</h2>
        <p style={p}>The Service is provided "as is." To the maximum extent permitted by law, we are not
          liable for any indirect, incidental, or consequential loss arising from your use of a report,
          including business decisions made based on extracted data. Our total liability for any claim is
          limited to the amount you paid for the specific report in question.</p>

        <h2 style={h2}>7. Refunds and cancellations</h2>
        <p style={p}>See our separate <Link href="/refund-policy" style={link}>Refund & Cancellation Policy</Link> for details.</p>

        <h2 style={h2}>8. Governing law</h2>
        <p style={p}>These terms are governed by the laws of India. Any disputes will be subject to the
          exclusive jurisdiction of the courts of Lucknow, Uttar Pradesh.</p>

        <h2 style={h2}>9. Changes to these terms</h2>
        <p style={p}>We may update these terms from time to time. Continued use of the Service after a
          change constitutes acceptance of the updated terms.</p>

        <h2 style={h2}>10. Contact us</h2>
        <p style={p}>Questions about these terms:{' '}
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
