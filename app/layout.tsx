import "./globals.css";

export const metadata = {
  title: "Cloudetics",
  description: "Cloudetics – Rebuilding the Cloud Intelligently with AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
