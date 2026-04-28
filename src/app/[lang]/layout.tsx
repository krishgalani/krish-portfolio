import '../globals.css';
import LanguageToggle from '@/components/LanguageToggle';
import type { Metadata } from 'next';
import { Locale } from '@/types';

export const metadata: Metadata = {
  title: 'Krish Galani',
  description: 'Full-stack Engineer Portfolio',
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageToggle lang={locale} />
        {children}
      </body>
    </html>
  );
}
