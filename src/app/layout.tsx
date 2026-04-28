import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Krish Galani',
  description: 'Full-stack Engineer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <LanguageToggle />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
