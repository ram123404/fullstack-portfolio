import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'John Doe - Full Stack Developer',
  description: 'Portfolio website of John Doe, a passionate full-stack developer creating amazing digital experiences.',
  keywords: 'full stack developer, web developer, portfolio, react, next.js, mongodb',
  authors: [{ name: 'John Doe' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}