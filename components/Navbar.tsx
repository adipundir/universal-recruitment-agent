'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAccount } from 'wagmi'
import { BlackCreateWalletButton } from './CoinbaseWalletBtn'
import { TokenRow } from '@coinbase/onchainkit/token';
import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownBasename,
    WalletDropdownFundLink,
    WalletDropdownLink,
    WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
    Address,
    Avatar,
    Name,
    Identity,
    EthBalance,
} from '@coinbase/onchainkit/identity';
import useJobOpeningsStore from '@/Zustand/JobOpeningsStore'
import { useEffect } from 'react'
import getAllJobOpenings from "@/UtilityFunctions/GetAllOpenings.js"

const routes = [
    { path: '/openings', label: 'Job Openings', value: 'openings' },
    { path: '/tnc', label: 'T&C', value: 'privacy' },
]

export default function Navbar() {
    const { theme, setTheme } = useTheme()
    const { isConnected, address } = useAccount()
    const jobOpenings = useJobOpeningsStore((state : any) => state.jobOpenings);
    const setJobOpenings = useJobOpeningsStore((state : any) => state.setJobOpenings);


    useEffect(() => {
        (async () => {
            const _JobOpenings = await getAllJobOpenings();
            console.log("All openings",_JobOpenings)
            setJobOpenings(_JobOpenings);
        })();
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
            <div className="container mx-auto px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold">
                            URA
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4 min-w-60">
                        {routes.map((route) =>
                            <Link key={route.value} href={`${route.path}`} className='hover:underline-offset-4 hover:underline'>{route.label}</Link>
                        )}
                        <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        {/* <BlackCreateWalletButton /> */}
                        <Wallet >
                            <ConnectWallet className='bg-black dark:bg-white text-white dark:text-black'>
                                <Avatar className="h-6 w-6  text-black dark:text-black bg-black" />
                                {/* <Name /> */}
                                <Address className=' text-white dark:text-black'/>
                            </ConnectWallet>
                            <WalletDropdown>
                                <Identity
                                    className="px-4 pt-3 pb-2"
                                    hasCopyAddressOnClick
                                >
                                    <Avatar />
                                    <Name />
                                    <Address />
                                    <EthBalance />
                                </Identity>
                                <WalletDropdownBasename />
                                <WalletDropdownLink
                                    icon="wallet"
                                    href="https://keys.coinbase.com"
                                >
                                    View Balances
                                </WalletDropdownLink>
                                <WalletDropdownFundLink />
                                <WalletDropdownDisconnect />
                            </WalletDropdown>
                        </Wallet>
                    </div>
                </div>
            </div>
        </nav>
    )
}

