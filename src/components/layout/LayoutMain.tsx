'use client'
import React, { useState, createContext } from 'react'
import DialogInfo from '../dialog/DialogInfo'
import DialogProfile from '../dialog/DialogProfile'

interface LayoutMainContextType {
    count: number
    setCount: React.Dispatch<React.SetStateAction<number>>
}

export const LayoutMainContext = createContext<LayoutMainContextType | null>(
    null
)

const LayoutMain = ({ children }: { children: React.ReactNode }) => {
    const [count, setCount] = useState<number>(0)
    return (
        <LayoutMainContext.Provider value={{ count, setCount }}>
            <div className="flex min-h-screen flex-col p-2">
                <nav className="mb-4 flex items-center justify-between">
                    <DialogInfo />
                    <DialogProfile />
                </nav>
                <main className="flex flex-1 items-center">{children}</main>
            </div>
        </LayoutMainContext.Provider>
    )
}

export default LayoutMain
