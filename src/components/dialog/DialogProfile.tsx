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
        localStorage.setItem('score','0')
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
                        <div>
                            <button
                                onClick={handleResetScore}
                                className="bg-accent border-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent rounded-md border px-2 py-1 transition-all active:scale-90"
                            >
                                Reset
                            </button>
                        </div>
                        {/* <DialogDescription>Create by BBSW</DialogDescription> */}
                        <DialogFooter>
                            {/* <div className="flex items-center justify-center gap-2">
                                <div className="rounded-full border p-1">
                                    <GithubIcon />
                                </div>
                                <Link
                                    href={'https://github.com/b-bsw'}
                                    target="_blank"
                                    className="hover:bg-foreground font-prompt hover:text-background rounded-2xl border px-2 py-1 transition-all active:scale-90"
                                >
                                    GITHUB
                                </Link>
                            </div> */}
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogProfile
