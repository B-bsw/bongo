'use client'
import React, { useState, useEffect, useRef, useContext } from 'react'
import Image from 'next/image'

import bongo1 from '@/../public/image/bongocat-0000.jpg'
import bongo2 from '@/../public/image/bongocat-0003.jpg'
import { LayoutMainContext } from '@/components/layout/LayoutMain'

export default function Page() {
    const context = useContext(LayoutMainContext)
    if (!context) throw new Error('missing context')

    const { count, setCount } = context

    const [isSwitchImg, setIsSwitchImg] = useState(true)
    const [popCount, setPopCount] = useState<number[]>([])
    const audioPool = useRef<HTMLAudioElement[]>([])
    const lastTouchIds = useRef<Set<number>>(new Set())

    // --- Load sound pool ---
    useEffect(() => {
        for (let i = 0; i < 5; i++) {
            const a = new Audio('/sound/pop.mp3')
            a.preload = 'auto'
            audioPool.current.push(a)
        }
        return () => {
            audioPool.current.forEach(a => {
                a.pause()
                a.src = ''
            })
            audioPool.current = []
        }
    }, [])

    // --- Local storage handling ---
    useEffect(() => {
        const raw = localStorage.getItem('score')
        const n = Number(raw)
        setCount(Number.isFinite(n) ? n : 0)
    }, [])

    useEffect(() => {
        localStorage.setItem('score', Number.isFinite(count) ? count.toString() : '0')
    }, [count])

    // --- Play sound from pool ---
    const playSound = () => {
        const a = audioPool.current.find(x => x.paused)
        if (a) {
            a.currentTime = 0
            a.play().catch(() => {})
        }
    }

    // --- Main pop handler ---
    const handlePop = () => {
        setIsSwitchImg(prev => !prev)
        const next = (Number.isFinite(count) ? count : 0) + 1
        setCount(next)
        playSound()

        // animation effect
        setPopCount(pre => [...pre, next])
        requestAnimationFrame(() => {
            setTimeout(() => {
                setPopCount(e => e.filter(p => p !== next))
            }, 1000)
        })
    }

    // --- Touch and click handler ---
    const handleTouchStart = (e: React.TouchEvent) => {
        for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i]
            if (!lastTouchIds.current.has(touch.identifier)) {
                lastTouchIds.current.add(touch.identifier)
                handlePop()
            }
        }
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            lastTouchIds.current.delete(e.changedTouches[i].identifier)
        }
    }

    return (
        <div className="h-screen flex flex-col items-center justify-between overflow-hidden">
            <div className="font-prompt text-5xl font-medium select-none mt-6">{count}</div>

            <div
                onMouseDown={handlePop}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative select-none touch-manipulation"
            >
                {/* Floating POP! text */}
                <div className="pointer-events-none absolute inset-0">
                    {popCount.map(item => (
                        <div
                            key={item}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-3xl font-bold text-pink-400 opacity-0 animate-pop-fade"
                        >
                            POP!
                        </div>
                    ))}
                </div>

                {/* Smooth switch image */}
                <div className="transition-transform duration-100 ease-in">
                    <Image
                        src={isSwitchImg ? bongo1 : bongo2}
                        alt="bongo"
                        className="transition-all duration-150 ease-in-out"
                        priority
                    />
                </div>
            </div>

            <style jsx>{`
                @keyframes popFade {
                    0% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-50%, -150%) scale(1.5);
                    }
                }
                .animate-pop-fade {
                    animation: popFade 1s ease-out forwards;
                }
            `}</style>
        </div>
    )
}
