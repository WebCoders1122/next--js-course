import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is Applictation Home Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <nav className='text-center font-medium text-2xl'>
          Application Navbar
        </nav>
        {children}
        <footer className='text-center font-medium text-2xl text-gray-400'>
          Application Footer
        </footer>
      </body>
    </html>
  );
}
