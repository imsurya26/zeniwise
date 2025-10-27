import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { AuthProvider } from "@/context/AuthContext";
import OfflineBanner from "@/components/OfflineBanner";

export const metadata: Metadata = {
  title: "Zeniwise - Student Budget Planner",
  description: "Manage your expenses, track savings goals, and build better financial habits",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CurrencyProvider>
            <OfflineBanner />
            {children}
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
