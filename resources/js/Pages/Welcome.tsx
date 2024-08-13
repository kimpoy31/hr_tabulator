import { Link } from '@inertiajs/react'
import React from 'react'
import { MdLogout } from 'react-icons/md'

const Welcome = () => {
  return (
    <div>
        <Link href={route('logout')} className='btn btn-sm btn-outline btn-error'><MdLogout size={18} /> Logout</Link>
    </div>
  )
}

export default Welcome