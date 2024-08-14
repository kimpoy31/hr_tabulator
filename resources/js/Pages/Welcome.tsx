import { Activity, Contestant, Criteria, PageProps, User } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { MdLogout } from 'react-icons/md'

const Welcome = () => {
  const { props } = usePage<PageProps>()

  const [activity, setActivity] = useState<Activity | undefined>()
  const [criterias, setCriterias] = useState<Criteria[]>([])
  const [contestants, setContestants] = useState<Contestant[]>([])

  useEffect(() => {
    console.log(props)

    setActivity(props.activity)
    setCriterias(props.criterias)
    setContestants(props.contestants)
  },[])

  return (
    <div>
        <Link href={route('logout')} className='btn btn-sm btn-outline btn-error'><MdLogout size={18}/> Logout</Link>
        <div>{activity?.activity}</div>
        <div>{activity?.description}</div>
        <div>{  props.auth.user.userInformation.fullname }</div>
        <div>{  criterias.map((criteria, index) => <div key={index}> {criteria.criteria} </div> ) }</div>
    </div>
  )
}

export default Welcome