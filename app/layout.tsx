import { Providers } from '@/components/custom/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import {
  Albert_Sans,
  DM_Sans,
  Montserrat,
  Montserrat_Alternates,
  Nunito,
  Roboto,
  Sora,
} from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';

const montSerrat = Montserrat_Alternates({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const montSerratDefault = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const albert_sans = Albert_Sans({
  variable: '--font-albert-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Magenta',
  description: 'A modern waiter',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${montSerrat.variable} ${sora.variable} ${dmSans.variable} ${montSerratDefault.variable} ${roboto.variable} ${albert_sans.variable} ${nunito.variable} font-sans antialiased`}>
        <Providers>
          <Suspense>
            {children}
            <Toaster position='top-right' richColors />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
