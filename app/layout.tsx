// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./_components/NavBar";
import Footer from "./_components/Footer";
import { StoreProvider } from "./lib/store";
import { ClerkProvider } from "@clerk/nextjs";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ecommerce Shop",
  description: "This is ecommerce website with nextJs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return ( <ClerkProvider>
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} min-h-screen`}>
          <StoreProvider>
                <NavBar />
                    {children}
                <Footer />

            </StoreProvider>
      </body>
    </html>
 </ClerkProvider>);
}
