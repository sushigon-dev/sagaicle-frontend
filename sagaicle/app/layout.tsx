import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/layout/Header";

// Font Family: Noto Sans JP
const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-notojp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "sagaicle",
  description: "佐賀のサイクリングコースを見つける",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} antialiased`}>
        <AuthProvider>
          <Header />
          <main className="pt-20">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
