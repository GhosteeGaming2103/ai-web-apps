import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import SessionProvider from "@/components/ui/SessionProvider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    <html data-theme="dim" lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <main>
            <header>
              <Navbar />
            </header>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
