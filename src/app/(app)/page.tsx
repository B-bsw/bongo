'use client'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { LayoutMainContext } from '@/components/layout/LayoutMain'

export default function page() {
    const context = useContext(LayoutMainContext)
    if (!context) throw new Error('missing context')

    const { count, setCount } = context
    const [isSwitchImg, setIsSwitchImg] = useState(true)
    const [popCount, setPopCount] = useState<number[]>([])
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const audioPlay = () => {
        const base = audioRef.current
        if (base) {
                const clone = base.cloneNode(true) as HTMLAudioElement
                clone.play().catch(() => {})

        }
    }

    const handlePop = () => {
        setIsSwitchImg((e) => !e)
        const current = Number.isFinite(count) ? count : 0
        const next = current + 1
        setCount(next)

        audioPlay()

        setPopCount((pre) => [...pre, next])
        setTimeout(() => {
            setPopCount((e) => e.filter((p) => p !== next))
        }, 1200)
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
        localStorage.setItem(
            'score',
            Number.isFinite(count) ? count.toString() : '0'
        )
    }, [count])

    return (
        <div
            className="h-100"
            onTouchStart={handlePop}
            onTouchEnd={() =>
                setTimeout(() => {
                    setIsSwitchImg(false)
                }, 100)
            }

            // onMouseDown={handlePop}
            // onMouseUp={() =>
            //     setTimeout(() => {
            //         setIsSwitchImg(false)
            //     }, 40)
            // }
        >
            <div className="flex h-full flex-col items-center justify-between">
                <div className="font-prompt text-5xl font-medium">{count}</div>

                <div className="touch-manipulation select-none">
                    <div className="pointer-events-none absolute inset-0">
                        {popCount.map((item) => (
                            <div
                                key={item}
                                className="fadeTop absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-3xl font-bold text-pink-400"
                            >
                                Bong!
                            </div>
                        ))}
                    </div>
                    <div
                        className={`${isSwitchImg ? 'bgCat0' : 'bgCat1'} h-60 w-100 bg-transparent select-none`}
                    />
                </div>
            </div>
        </div>
    )
}
