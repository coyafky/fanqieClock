import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pomodoro",
  description: "番茄钟 Web 应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-cover bg-center`}
        style={{ backgroundImage: 'url(https://picsum.photos/1920/1080?random)' }}
      >
        <div className="min-h-screen backdrop-brightness-75">
          <main className="mx-auto max-w-xl p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
