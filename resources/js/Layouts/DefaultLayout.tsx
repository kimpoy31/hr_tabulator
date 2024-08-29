import Navbar from '@/Components/Navbar';
import React, { PropsWithChildren } from 'react'

interface DefaultLayoutProps extends PropsWithChildren<{}> {
  className?: string;
}

const DefaultLayout = ({ children, className }: DefaultLayoutProps) => {
  return (
    <div>
        <header>
          <Navbar />
        </header>
        <main className={className}>
            { children }
        </main>
    </div>
  )
}

export default DefaultLayout