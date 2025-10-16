'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { GithubIcon, LucideOctagonX } from 'lucide-react'
import Link from 'next/link'

const DialogInfo = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <LucideOctagonX className="cursor-pointer transition-all active:scale-90" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Information</DialogTitle>
                        <DialogDescription>Create by BBSW</DialogDescription>
                        <DialogFooter>
                            <div className="flex items-center justify-center gap-2">
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
                            </div>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogInfo
