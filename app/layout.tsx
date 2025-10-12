import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Security Test App",
  description: "Intentionally vulnerable Next.js app for Semgrep testing"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
