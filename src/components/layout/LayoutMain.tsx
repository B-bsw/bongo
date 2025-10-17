'use client'
import React, { useState, createContext } from 'react'
import DialogInfo from '../dialog/DialogInfo'
import DialogProfile from '../dialog/DialogProfile'
import { useRouter } from 'next/navigation'

interface LayoutMainContextType {
    count: number
    setCount: React.Dispatch<React.SetStateAction<number>>
}

export const LayoutMainContext = createContext<LayoutMainContextType | null>(
    null
)

const LayoutMain = ({ children }: { children: React.ReactNode }) => {
    const route = useRouter()
    const [count, setCount] = useState<number>(0)
    return (
        <LayoutMainContext.Provider value={{ count, setCount }}>
            <div className="flex h-full flex-col p-2 select-none">
                <div className="flex h-full flex-1 flex-col justify-between">
                    <nav className="mb-4 flex items-center justify-between">
                        <DialogInfo />
                        <DialogProfile />
                    </nav>
                    <main className="flex items-center justify-center">
                        {children}
                    </main>

                    <footer className="footer-with-inset safe-area-inset-bottom flex h-10 w-full items-stretch rounded-lg bg-zinc-400">
                        <div className="[&_button]:font-prompt [&_button]:hover:bg-accent flex w-full items-center justify-around gap-1 px-1 [&_button]:grow [&_button]:cursor-pointer [&_button]:rounded-md [&_button]:bg-zinc-300 [&_button]:px-2 [&_button]:py-1 [&_button]:font-bold [&_button]:text-zinc-800 [&_button]:transition-all [&_button]:active:scale-95">
                            <button onClick={() => route.push('/')}>
                                Home
                            </button>
                            <button onClick={() => route.push('/rank')}>
                                rank
                            </button>
                            <button onClick={() => route.push('/other')}>
                                other
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </LayoutMainContext.Provider>
    )
}

export default LayoutMain
