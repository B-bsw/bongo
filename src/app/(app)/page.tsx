'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

import bongo1 from '@/public/image/bongocat-0000.jpg'
import bongo2 from '@/public/image/bongocat-0003.jpg'
import { LucideOctagonX, User } from 'lucide-react'

export default function page() {
    const [isSwithImg, setIsSwitchImg] = useState<boolean>(true)
    const [count, setCount] = useState<number>(0)

    const [popCount, setPopCount] = useState<Array<number>>([])

    const audioRef = useRef<HTMLAudioElement | null>(null)

    const handlePop = () => {
        setIsSwitchImg((e) => !e)
        const current = Number.isFinite(count) ? count : 0
        const next = current + 1
        setCount(next)

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

        setPopCount((pre) => [...pre, next])
        setTimeout(() => {
            setPopCount((e) => e.filter((p) => p !== next))
        }, 1500)
    }

    useEffect(() => {
    audioRef.current = new Audio('/sound/pop.mp3')
        audioRef.current.preload = 'auto'

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [])

    useEffect(() => {
        const raw = localStorage.getItem('score')
        const n = Number(raw)
        setCount(Number.isFinite(n) ? n : 0)
    }, [])

    useEffect(() => {
        localStorage.setItem('score', Number.isFinite(count) ? count.toString() : '0')
    }, [count, isSwithImg])

    return (
        <div className="h-screen w-screen overflow-hidden overscroll-none overscroll-y-none p-2 select-none">
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
                    <div className="font-prompt text-5xl font-medium">
                        {count}
                    </div>

                    <div onClick={handlePop} className='touch-manipulation select-none'>
                        <div className="absolute transition-all ">
                            {popCount?.length > 0 &&
                                popCount.map((item) => (
                                    <div key={item} className='fixed fadeTop'>POP</div>
                                ))}
                        </div>
                        <Image src={isSwithImg ? bongo1 : bongo2} alt="bongo" />
                    </div>
                </div>
            </main>
        </div>
    )
}
