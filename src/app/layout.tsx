import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  const linkClass = "relative font-medium text-[0.95rem] text-forest-green after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-sage hover:after:w-full after:transition-all after:duration-300";

  return (
    <html lang="pl" className={cn(inter.variable, playfair.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <body className="bg-brand-dark-green text-brand-sand min-h-screen" suppressHydrationWarning>
        <header className="absolute top-0 left-0 w-full z-50 py-6">
          <nav className="container-custom flex justify-between items-center">
            <Link href="/" className="text-brand-peach font-serif text-2xl font-bold tracking-tight">
              Wojtek Kotyrba
            </Link>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer className="bg-black/30 text-brand-sand py-16 mt-12">
          <div className="container-custom flex flex-col md:flex-row justify-between gap-8">
            <div>
              <h3 className="text-brand-peach font-serif text-xl mb-2">Wojciech Kotyrba</h3>
              <p className="text-brand-sand/90 font-medium">Szkółka Roślin Ozdobnych<br/>ul. Łęczycka 17, 85-737 Bydgoszcz</p>
            </div>
            <div className="md:text-right">
              <div className="text-brand-sand/90 font-medium">
                <a href="tel:503935055" className="hover:text-brand-peach transition-colors inline-block py-3 mb-1 min-h-[44px]">Tel: 503 935 055</a>
                <p>Otwarte: Pn-Pt 10.00 - 17.00, Sob 10.00 - 14.00</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
