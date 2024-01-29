import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'Taskflow',
   description: 'Simple Task Management App using NextJS',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang='en'>
         <body className='{inter.className}'>
            <section>{children}</section>
            <div>
               <Link href={'/'}>{'<-'}Back to Home</Link>
            </div>
         </body>
      </html>
   );
}
