import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { AuthContextProvider } from "./context/auth_context";
import { CartContextProvider } from "./context/cart_context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rebooted.biz",
  description: "Your one-stop shop for all things tech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <CartContextProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>

          </CartContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
