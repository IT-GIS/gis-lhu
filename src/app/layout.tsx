import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "GIS LHU",
  description: "Aplikasi manajemen GIS LHU untuk workflow laboratorium dan verifikasi publik.",
};

/**
 * RootLayout
 * Layout utama aplikasi yang membungkus seluruh halaman.
 * Menyediakan ThemeProvider untuk mendukung dark/light mode.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
