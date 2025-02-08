"use client"
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Navbar from '@/components/Navbar';
import ThemeProvider from '@/components/ui/theme-provider';
import { ReactNode } from 'react';
import { http, createConfig } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';

const queryClient = new QueryClient();


export const config = createConfig({
    chains: [baseSepolia],
    connectors: [
        coinbaseWallet({ appName: 'Universal Recruiter', preference: 'smartWalletOnly', appLogoUrl: "/logo.png" }),
    ],
    transports: {
        [baseSepolia.id]: http(),
    },
});

const WagmiWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <WagmiProvider config={config}>
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