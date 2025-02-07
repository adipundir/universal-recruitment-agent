'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Address } from 'viem'

const routes = [
    { path: '/openings', label: 'Job Openings', value: 'openings' },
    { path: '/tnc', label: 'T&C', value: 'privacy' },
]

export default function Navbar() {
    const { theme, setTheme } = useTheme()
    const { isConnected, address } = useAccount()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
            <div className="container mx-auto px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold">
                            URA
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {routes.map((route) => 
                            <Link key={route.value} href={`${route.path}`} className='hover:underline-offset-4 hover:underline'>{route.label}</Link>
                        )}
                        <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                        <ConnectButton />
                        {isConnected ? (
                            <Link href={`/profile/${address}`}>
                            </Link>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

