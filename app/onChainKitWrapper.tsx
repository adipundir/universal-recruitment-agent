'use client';

import { baseSepolia } from 'wagmi/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

export const OnChainKitWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <OnchainKitProvider apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_CLIENT_API_KEY} chain={baseSepolia}>
                {children}
        </OnchainKitProvider>
    );
};
