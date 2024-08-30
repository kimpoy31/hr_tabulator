import Navbar from '@/Components/Navbar';
import React, { PropsWithChildren } from 'react'

interface DefaultLayoutProps extends PropsWithChildren<{}> {
  className?: string;
}

const DefaultLayout = ({ children, className }: DefaultLayoutProps) => {
  return (
    <div>
        <header className='absolute w-full'>
          <Navbar />
        </header>
        <main 
          className={`${className} h-screen pt-28 `}
          style={{
            backgroundImage: 'url("/images/pcsaBG.png")',
            backgroundSize: 'cover', // 'cover' or 'contain', depending on your needs
            backgroundPosition: 'center', // adjusts the image position
            backgroundRepeat: 'no-repeat', // prevents the image from repeating
          }}
        >
          { children }
        </main>
        <footer className="bg-base-200 w-full absolute bottom-0 lg:px-32 px-4 py-10 border-t-8">
          <div className="flex gap-4">
            <img src="/images/cscLogo.png" alt="cscLogo" className='lg:max-h-20 max-h-12' />
            <img src="/images/themeLogo.png" alt="cscLogo" className='lg:max-h-20 max-h-12' />
          </div>
        </footer>
    </div>
  )
}

export default DefaultLayout