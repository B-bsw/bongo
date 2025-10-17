import type { Metadata, Viewport } from 'next'
import './style/app.css'

export const metadata: Metadata = {
    title: 'Bongo Bongo',
    description: 'this is app',
}

export const viewport: Viewport = {
    viewportFit: 'cover',
    width: 'device-width',
    initialScale: 1,
    userScalable: false,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
