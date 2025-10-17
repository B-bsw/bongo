'use client'
import React, { useState, useEffect, useRef, useContext } from 'react'
import Image from 'next/image'

import bongo1 from '@/../public/image/bongocat-0000.jpg'
import bongo2 from '@/../public/image/bongocat-0003.jpg'
import { LayoutMainContext } from '@/components/layout/LayoutMain'

export default function Page() {
    const context = useContext(LayoutMainContext)

    if (!context) {
        throw new Error('missing context')
    }

    const { count, setCount } = context
    const [isSwitchImg, setIsSwitchImg] = useState(true)
    const [popCount, setPopCount] = useState<number[]>([])
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const handlePop = () => {
        setIsSwitchImg(false)

        const current = Number.isFinite(count) ? count : 0
        const next = current + 1
        setCount(next)

        const base = audioRef.current
        if (base) {
            try {
                const clone = base.cloneNode(true) as HTMLAudioElement
                clone.play().catch(() => {})
            } catch {
                base.currentTime = 0
                base.play().catch(() => {})
            }
        }

        setPopCount((prev) => [...prev, next])
        setTimeout(() => {
            setPopCount((e) => e.filter((p) => p !== next))
        }, 700)

        setTimeout(() => setIsSwitchImg(true), 120)
    }

    useEffect(() => {
        audioRef.current = new Audio('/sound/pop.mp3')
        audioRef.current.preload = 'auto'
        return () => {
            audioRef.current?.pause()
            audioRef.current = null
        }
    }, [])

    useEffect(() => {
        const raw = localStorage.getItem('score')
        const n = Number(raw)
        setCount(Number.isFinite(n) ? n : 0)
    }, [])

    useEffect(() => {
        localStorage.setItem(
            'score',
            Number.isFinite(count) ? count.toString() : '0'
        )
    }, [count])

    return (
        <div className="flex h-screen flex-col items-center justify-center overflow-hidden select-none">
            <div className="font-prompt mb-4 text-6xl font-bold">{count}</div>

            <div
                onClick={handlePop}
                className="relative cursor-pointer touch-manipulation"
            >
                {popCount.map((item) => (
                    <div
                        key={item}
                        className="fadeTop absolute top-1/5 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-extrabold text-pink-400"
                    >
                        POP!
                    </div>
                ))}

                <Image
                    src={isSwitchImg ? bongo1 : bongo2}
                    alt="bongo"
                    width={400}
                    height={400}
                    priority
                    draggable={false}
                    className="select-none"
                />
            </div>
        </div>
    )
}
