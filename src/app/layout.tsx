import type { ReactNode } from 'react';
import { League_Spartan, Montserrat } from "next/font/google";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ['100','200','300',"400",'500','600',"700",'800','900'],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ['300',"400", "500", "600",'700'],
});

type Props = {
  children: ReactNode;
};

// Root layout with html/body tags required by Next.js
// Note: The lang attribute is managed by the middleware and [locale] routing
export default function RootLayout({ children }: Props) {
  return (
    <html lang="nl" suppressHydrationWarning suppressContentEditableWarning>
      <body className={`${leagueSpartan.variable} ${montserrat.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
