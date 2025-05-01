import type { Metadata } from 'next';
import {
  DM_Sans,
  Montserrat_Alternates,
  Montserrat,
  Roboto,
  Albert_Sans,
  Nunito,
} from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

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
        className={`${montSerrat.variable} ${dmSans.variable} ${montSerratDefault.variable} ${roboto.variable} ${albert_sans.variable} ${nunito.variable} font-sans antialiased`}>
        {children}
        <Toaster position='top-right' />
      </body>
    </html>
  );
}
