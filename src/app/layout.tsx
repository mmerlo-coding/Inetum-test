import type { Metadata } from "next";
import "../styles/globals.scss";

import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";
import TanstackProvider from "@/components/providers/tanstack-provider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Inetum - Dev Test",
  description: "App para gestionar tareas de usuarios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body cz-shortcut-listen="true">
        <Sidebar>
          <Link href="/">Lista de usuarios</Link>
        </Sidebar>
        <main>
          <TanstackProvider>{children}</TanstackProvider>
        </main>
      </body>
    </html>
  );
}
