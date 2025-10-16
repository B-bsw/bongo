import LayoutMain from '@/components/layout/LayoutMain'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <LayoutMain>
                <div>{children}</div>
            </LayoutMain>
        </>
    )
}

export default layout
