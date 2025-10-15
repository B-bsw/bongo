'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

import bongo1 from '@/public/image/bongocat-0000.jpg'
import bongo2 from '@/public/image/bongocat-0003.jpg'
import { LucideOctagonX, User } from 'lucide-react'

export default function page() {
    const [isSwithImg, setIsSwitchImg] = useState<boolean>(true)
    const [count, setCount] = useState<number>(0)

    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        audioRef.current = new Audio('/sound/mouse.mp3')
        audioRef.current.preload = 'auto'

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [])

    return (
        <div className="h-screen w-screen overflow-x-hidden p-2">
            <main className="h-full">
                <nav className="flex items-center justify-between p-4">
                    <div>
                        <LucideOctagonX />
                    </div>
                    <div>
                        <User />
                    </div>
                </nav>

                <div className="flex h-full flex-col items-center justify-evenly">
                    <div className="font-prompt text-5xl font-medium">{count}</div>

                    <div
                        className="w-full"
                        onClick={() => {
                            setIsSwitchImg((e) => !e)
                            setCount((c) => c + 1)

                            const base = audioRef.current
                            if (base) {
                                try {
                                    const clone = base.cloneNode(true) as HTMLAudioElement
                                    clone.addEventListener('ended', () => {
                                        try {
                                            clone.src = ''
                                        } catch {}
                                    })
                                    clone.play().catch((err) => {
                                        console.warn('Audio play failed:', err)
                                    })
                                } catch (err) {
                                    try {
                                        base.currentTime = 0
                                        base.play().catch(() => {})
                                    } catch {}
                                }
                            }
                        }}
                    >
                        <Image src={isSwithImg ? bongo1 : bongo2} alt="bongo" />
                    </div>
                </div>
            </main>
        </div>
    )
}
