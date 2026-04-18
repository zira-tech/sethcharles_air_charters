import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Sethcharles Air Charters Ltd | Premium Charter in Kenya & Africa",
  description: "Experience unparalleled luxury private jet charter across Kenya, East Africa, and beyond. From the savanna to the sea, your journey meticulously crafted.",
  keywords: "private jet charter, Kenya, Africa, luxury travel, charter flights, Masai Mara, Nairobi",
  openGraph: {
    title: "Sethcharles Air Charters Ltd | Premium Charter in Kenya & Africa",
    description: "Your Africa. Your Way. Premium private jet charter across Kenya and beyond.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#0A0A0A] antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
