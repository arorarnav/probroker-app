import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'ProBroker.ai — App',
  description: 'Sign in to view your reports',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
        background: '#0B0A08',
        color: '#F5F1E7',
        minHeight: '100vh',
      }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
