'use client'
import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { GithubIcon, LucideOctagonX, User } from 'lucide-react'
import Link from 'next/link'
import { LayoutMainContext } from '../layout/LayoutMain'

const DialogProfile = () => {
    const context = useContext(LayoutMainContext)
    if (!context) {
        throw new Error('missing context')
    }
    const { setCount } = context

    const handleResetScore = () => {
        localStorage.setItem('score', '0')
        setCount(0)
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <User className="cursor-pointer transition-all active:scale-90" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Profile</DialogTitle>

                        <div className="">
                            <div className='w-full flex items-center justify-between'>
                                <label
                                    htmlFor="name"
                                    className="font-prompt text-md text-gray-900 font-semibold"
                                >
                                    Name:
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="rounded-md border-2 p-1"
                                />
                            </div>
                        </div>
                        <div>
                            <button className="font-prompt rounded-md bg-secondary px-2 py-1 font-medium transition-all active:scale-90">
                                Confirm
                            </button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogProfile
