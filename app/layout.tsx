import type { Metadata } from 'next';
import { Fanwood_Text } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '../components/ui/navbar';

import { StoreProvider } from '@/store/StoreProvider';

const fanwoodText = Fanwood_Text({ weight: '400', subsets: ['latin'] });
// export const quattrocento = Quattrocento({ weight: '700', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DecoAR app',
  description:
    'AR Decor Visualizer is a web application that leverages augmented reality (AR) technology to allow users to visualize  furniture and decor items in their own living spaces.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        {/* suppressHydrationWarning: Fix hydration warning caused by some chrome extensions, only affects body, not children */}
        <body className={`${fanwoodText.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Navbar />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
    </StoreProvider>
  );
}


