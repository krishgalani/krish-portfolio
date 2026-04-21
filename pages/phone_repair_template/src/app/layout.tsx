import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIXHUB - 香港手機維修",
  description: "專業快速手機維修服務 | iPhone、Android、三星各類維修",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="antialiased">{children}</body>
    </html>
  );
}