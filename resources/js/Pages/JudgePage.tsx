import { Activity, Contestant, Criteria, PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { MdLogout } from 'react-icons/md'

const JudgePage = () => {
    const { props } = usePage<PageProps>()

    const [activity, setActivity] = useState<Activity | undefined>()
    const [criterias, setCriterias] = useState<Criteria[]>([])
    const [contestants, setContestants] = useState<Contestant[]>([])

    useEffect(() => {
        setActivity(props.activity)
        setCriterias(props.criterias)
        setContestants(props.contestants)

    }, [props.activity, props.criterias, props.contestants])

  return (
    <div className='lg:px-32 px-4 py-4'>
        <div className="flex justify-between">
        <div>
          <div className='text-3xl uppercase font-extrabold'>{  props.auth.user.userInformation.fullname }</div>
          <div className='flex items-center gap-1'>
            <div className="badge badge-neutral text-white uppercase">judge</div>
            <div className='uppercase'>{activity?.activity} </div>
          </div>
        </div>
        <Link href={route('logout')} className='btn lg:btn-sm btn-xs btn-outline btn-error'><MdLogout size={18}/> Logout</Link>
      </div>


        {contestants.length === 0 || criterias.length === 0
        ?   <div className='w-full text-center p-8 bg-slate-100 mt-4 shadow-md uppercase font-bold'>
                Please contact administrator {contestants.length + ' ' + criterias.length} 
            </div>
        :    <div>
                TABLE HERE
            </div>
        }
        
    </div>
  )
}

export default JudgePage