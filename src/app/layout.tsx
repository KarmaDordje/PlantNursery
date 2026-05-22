import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Wojtek Kotyrba | Szkółka Drzew i Krzewów Ozdobnych",
  description: "Bydgoszcz - Szkółka roślin ozdobnych. Znajdź idealne drzewa i krzewy do swojego ogrodu. Producent z tradycjami, projektowanie i zakładanie ogrodów.",
  keywords: "Szkółka drzew, krzewy ozdobne, Bydgoszcz, rośliny Bydgoszcz, tuje Bydgoszcz, projektowanie ogrodów",
  openGraph: {
    title: "Wojtek Kotyrba | Szkółka Drzew i Krzewów Ozdobnych",
    description: "Szkółka roślin ozdobnych. Znajdź idealne drzewa i krzewy do swojego ogrodu.",
    url: "https://www.wojtekogrodnik.pl",
    siteName: "Wojtek Kotyrba Szkółka",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <nav className="navbar">
          <div className="container">
            <Link href="/" className="logo">
              🌿 Wojtek Ogrodnik
            </Link>
            <div className="nav-links">
              <Link href="/o-nas">O nas</Link>
              <Link href="/katalog">Katalog Roślin</Link>
              <Link href="/uslugi">Usługi</Link>
              <Link href="/porady">Porady</Link>
              <Link href="/kontakt">Kontakt</Link>
            </div>
          </div>
        </nav>
        <main style={{ paddingTop: '80px' }}>
          {children}
        </main>
        <footer className="footer">
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ color: 'white' }}>Wojciech Kotyrba</h3>
              <p style={{ color: 'var(--color-sage-light)' }}>Szkółka Roślin Ozdobnych<br/>ul. Łęczycka 17, 85-737 Bydgoszcz</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'var(--color-sage-light)' }}>
                <a href="tel:503935055">Tel: 503 935 055</a><br/>
                Otwartę: Pn-Pt 10.00 - 17.00, Sob 10.00 - 14.00
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
