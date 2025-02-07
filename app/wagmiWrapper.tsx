"use client"
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Navbar from '@/components/Navbar';
import ThemeProvider from '@/components/ui/theme-provider';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

const wagmiConfig = getDefaultConfig({
    appName: 'Universal Recruitment Agent',
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
    chains: [baseSepolia],
    ssr: false,
});

const WagmiWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <WagmiProvider config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider coolMode>
                        <Navbar />
                        <div className='px-32'>
                            {children}
                        </div>
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </ThemeProvider>
    );
};

export default WagmiWrapper;