import type { Metadata } from "next";
import { Skeleton } from "@mui/material";
import { Suspense } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ClientThemeProvider from "./ThemeProvider";
import Footer from "@/components/Footer/Footer";
import AppBarMenuController from "@/controllers/global/appBarMenu";
import MarketSummaryController from '@/controllers/global/marketSummary';
import { COLORS } from "@/theme/colors";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iRO Market",
  description: "WebApp for the iRO Market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientThemeProvider>
          <div
            className="flex flex-col w-full min-h-screen md:h-screen md:overflow-hidden overflow-y-auto"
            style={{
              backgroundColor: COLORS.primary_background,
              color: COLORS.third_background_text,
              fontFamily: "sans-serif"
            }}>
            <main className="flex flex-col flex-grow w-full items-center sm:items-start overflow-hidden">
              <Suspense fallback={<Skeleton width="100%" animation="wave" variant="rounded" />}>
                <AppBarMenuController />
              </Suspense>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '4fr 1fr' },
                  gridTemplateRows: '1fr',
                  alignItems: 'stretch',
                  gap: 4,
                  paddingX: 4,
                  paddingY: { xs: 2, md: 4 },
                  width: '100%',
                  flexGrow: 1,
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  height: { xs: 'auto', md: '100%' },
                }}
              >
                <Box
                  sx={{
                    order: { xs: 1, md: 2 },
                    height: { xs: 'auto', md: '100%' },
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}
                >
                  <Suspense fallback={<Skeleton width="100%" animation="wave" variant="rounded" />}>
                    <MarketSummaryController />
                  </Suspense>
                </Box>
                <Paper
                  elevation={3}
                  sx={{
                    minWidth: 0,
                    paddingX: 2,
                    borderRadius: 4,
                    background: COLORS.second_background,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden',
                    order: { xs: 2, md: 1 },
                  }}
                >
                  {children}
                </Paper>
              </Box>
            </main>
            <footer className="flex flex-wrap items-center justify-center">
              <Footer />
            </footer>
          </div>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
