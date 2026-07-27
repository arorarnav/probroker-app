'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { PRICING_TIERS } from '../../lib/pricing';

export default function DashboardPage() {
  function daysSince(dateStr) {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [selectedTier, setSelectedTier] = useState(PRICING_TIERS[0]);
  const [uploadingId, setUploadingId] = useState(null);
  const [selectedFileById, setSelectedFileById] = useState({});
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/login');
        return;
      }
      setUser(user);

      const { data } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setReports(data || []);
      setLoading(false);
    }
    init();
  }, [router]);

  async function refreshReports() {
    const { data } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setReports(data || []);
  }

  async function handleFileUpload(reportId, file) {
    if (!file) return;
    setUploadingId(reportId);

    // Storage paths can't contain emoji or most special characters --
    // clean the filename for the actual storage key, but keep the original
    // name for display (that's just text, no restrictions there).
    const safeName = file.name
      .normalize('NFKD')
      .replace(/[^\w.\-]/g, '_');

    const filePath = `${user.id}/${reportId}/${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from('chat-uploads')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message);
      setUploadingId(null);
      return;
    }

    // months_back was already locked in at payment time -- upload only
    // needs to attach the file and flip status to processing.
    const { error: updateError } = await supabase
      .from('reports')
      .update({ filename: file.name, status: 'processing' })
      .eq('id', reportId);

    setUploadingId(null);
    if (updateError) {
      alert('File uploaded, but updating the report failed: ' + updateError.message);
    } else {
      setSelectedFileById({ ...selectedFileById, [reportId]: null });
      await refreshReports();
    }
  }

  async function handleDownload(reportPath) {
    const { data, error } = await supabase.storage
      .from('reports-output')
      .createSignedUrl(reportPath, 60);

    if (error || !data) {
      alert('Could not generate a download link. Please try again.');
      return;
    }
    window.open(data.signedUrl, '_blank');
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  function loadRazorpayScript() {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-sdk')) return resolve(true);
      const script = document.createElement('script');
      script.id = 'razorpay-sdk';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handleBuyReport() {
    setPaying(true);
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Could not load payment SDK. Check your connection and try again.');
      setPaying(false);
      return;
    }

    // The server looks up the real price from selectedTier.months itself --
    // we're not sending a price from the browser, only the chosen window.
    const orderRes = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ months: selectedTier.months }),
    });
    const order = await orderRes.json();

    if (order.error) {
      alert('Could not start payment: ' + order.error);
      setPaying(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'ProBroker.ai',
      description: `WhatsApp listing report — last ${selectedTier.months} months`,
      order_id: order.id,
      handler: async function (response) {
        const verifyRes = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            user_id: user.id,
            months: selectedTier.months,
          }),
        });
        const result = await verifyRes.json();
        if (result.success) {
          alert('Payment confirmed! Upload your WhatsApp export below to get started.');
          await refreshReports();
        } else {
          alert('Payment could not be verified. Email support@probroker.ai before resending.');
        }
      },
      prefill: { email: user.email },
      theme: { color: '#A67C3D' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setPaying(false);
  }

  if (loading) return <div style={wrap}><p style={{ color: '#F5F1E7' }}>Loading...</p></div>;

  return (
    <div style={wrap}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={header}>
          <h1 style={title}>Your Reports</h1>
          <button onClick={handleLogout} style={logoutBtn}>Log out</button>
        </div>
        <p style={{ color: 'rgba(245,241,231,0.62)', marginBottom: 28 }}>{user?.email}</p>

        <div style={buyCard}>
          <h3 style={{ margin: '0 0 14px', fontSize: 18 }}>Order a new report</h3>

          <div style={tierGrid}>
            {PRICING_TIERS.map((tier) => (
              <button
                key={tier.months}
                onClick={() => setSelectedTier(tier)}
                style={{
                  ...tierOption,
                  ...(selectedTier.months === tier.months ? tierOptionSelected : {}),
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 15 }}>Last {tier.months} months</div>
                <div style={{ fontSize: 13, opacity: 0.75, marginTop: 2 }}>₹{tier.priceInr}</div>
              </button>
            ))}
          </div>

          <button onClick={handleBuyReport} disabled={paying} style={{ ...button, marginTop: 16 }}>
            {paying ? 'Opening...' : `Pay ₹${selectedTier.priceInr} for ${selectedTier.months} months`}
          </button>
        </div>

        {reports.length === 0 ? (
          <p style={{ color: 'rgba(245,241,231,0.62)', marginTop: 28 }}>
            No reports yet. Order one above to get started.
          </p>
        ) : (
          <div style={{ marginTop: 28 }}>
            {reports.map((r) => {
              const pendingDays = r.status === 'pending' ? daysSince(r.created_at) : 0;
              const isStale = r.status === 'pending' && pendingDays >= 2;
              return (
              <div key={r.id} style={{
                ...reportRow,
                ...(isStale ? { border: '1px solid rgba(217,173,95,0.5)', background: 'rgba(217,173,95,0.06)' } : {}),
              }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{r.filename || 'Untitled report'}</div>
                  <div style={{ fontSize: 13, color: 'rgba(245,241,231,0.5)' }}>
                    {new Date(r.created_at).toLocaleDateString()} — {r.status}
                    {r.months_back ? ` — last ${r.months_back} months` : ''}
                  </div>
                  {r.status === 'pending' && (
                    <div style={{
                      fontSize: 12.5, marginTop: 4, fontWeight: 600,
                      color: isStale ? '#D9AD5F' : 'rgba(245,241,231,0.5)',
                    }}>
                      {pendingDays === 0
                        ? 'Paid today — upload your chat to get started'
                        : `Paid ${pendingDays} day${pendingDays > 1 ? 's' : ''} ago — you haven't uploaded a chat yet`}
                    </div>
                  )}
                </div>

                {r.status === 'completed' && r.report_path ? (
                  <button onClick={() => handleDownload(r.report_path)} style={downloadButton}>
                    Download →
                  </button>
                ) : r.status === 'pending' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                    <label style={uploadLabel}>
                      Choose file
                      <input
                        type="file"
                        accept=".txt,.zip"
                        style={{ display: 'none' }}
                        disabled={uploadingId === r.id}
                        onChange={(e) => setSelectedFileById({ ...selectedFileById, [r.id]: e.target.files[0] || null })}
                      />
                    </label>

                    {selectedFileById[r.id] && (
                      <div style={{ fontSize: 12.5, color: 'rgba(245,241,231,0.6)' }}>
                        {selectedFileById[r.id].name}
                      </div>
                    )}

                    <button
                      onClick={() => handleFileUpload(r.id, selectedFileById[r.id])}
                      disabled={!selectedFileById[r.id] || uploadingId === r.id}
                      style={{
                        ...submitButton,
                        opacity: !selectedFileById[r.id] || uploadingId === r.id ? 0.4 : 1,
                        cursor: !selectedFileById[r.id] || uploadingId === r.id ? 'default' : 'pointer',
                      }}
                    >
                      {uploadingId === r.id ? 'Uploading...' : 'Submit for Processing'}
                    </button>
                  </div>
                ) : r.status === 'failed' ? (
                  <a href="mailto:support@probroker.ai?subject=Failed report" style={{ color: '#C25450', fontSize: 14, textDecoration: 'underline' }}>
                    Failed — email support@probroker.ai
                  </a>
                ) : (
                  <span style={{ color: 'rgba(245,241,231,0.4)', fontSize: 14 }}>Processing...</span>
                )}
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const wrap = { minHeight: '100vh', padding: '48px 20px' };
const header = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const title = { fontSize: 28, fontWeight: 700, margin: 0 };
const logoutBtn = { background: 'none', border: '1px solid rgba(245,241,231,0.15)', color: 'rgba(245,241,231,0.7)', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 14 };
const buyCard = { background: '#151310', border: '1px solid rgba(166,124,61,0.3)', borderRadius: 12, padding: 24 };
const tierGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10 };
const tierOption = { background: '#0B0A08', border: '1.5px solid rgba(245,241,231,0.15)', borderRadius: 8, padding: '12px 14px', color: '#F5F1E7', cursor: 'pointer', textAlign: 'left' };
const tierOptionSelected = { borderColor: '#D9AD5F', background: 'rgba(166,124,61,0.12)' };
const button = { background: '#A67C3D', color: '#0B0A08', border: 'none', padding: '13px 24px', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' };
const reportRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#151310', borderRadius: 10, marginBottom: 10, border: '1px solid rgba(245,241,231,0.08)' };
const downloadButton = { background: 'none', border: '1.5px solid #D9AD5F', color: '#D9AD5F', fontWeight: 600, fontSize: 14, padding: '9px 16px', borderRadius: 7, cursor: 'pointer' };
const uploadLabel = { background: '#A67C3D', color: '#0B0A08', fontWeight: 600, fontSize: 13, padding: '9px 16px', borderRadius: 7, cursor: 'pointer' };
const submitButton = { background: '#D9AD5F', color: '#0B0A08', border: 'none', fontWeight: 700, fontSize: 13, padding: '10px 18px', borderRadius: 7 };
