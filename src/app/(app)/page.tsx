'use client'
import React , {useState} from 'react'
import Image from 'next/image'

import bongo1 from '@/public/image/bongocat-0000.jpg'
import bongo2 from '@/public/image/bongocat-0003.jpg'

export default function page() {
    const [isSwithImg,setIsSwitchImg] = useState<boolean>(true);
    return (
        <div className="h-screen w-screen overflow-x-hidden p-2">
            <main className="h-full">
                <nav className="flex items-center justify-between p-4">
                    <div>logo</div>
                    <div>profile</div>
                </nav>
                <div className="flex h-full items-center justify-center">
                    <div className="w-100" onClick={() => setIsSwitchImg((e) => !e) }>
                        <Image src={isSwithImg ? bongo1 : bongo2} alt="bongo" />
                    </div>
                </div>
            </main>
        </div>
    )
}
