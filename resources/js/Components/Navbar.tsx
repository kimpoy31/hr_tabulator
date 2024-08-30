import { PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { MdLogout } from 'react-icons/md'

const Navbar = () => {
    const { props } = usePage<PageProps>()

  return (
    <div 
        className="navbar bg-base-100 shadow-lg lg:px-32 px-4 md:px-16 flex justify-between">
        <div className='uppercase text-2xl font-bold'>HR Tabulator</div>
        {props.auth.user &&
            <Link href={route('logout')} className='btn lg:btn-sm btn-xs btn-outline btn-error'><MdLogout size={18}/> Logout</Link>
        }
    </div>
  )
}

export default Navbar