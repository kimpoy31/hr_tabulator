import { Activity, Contestant, Criteria, PageProps, Score } from '@/types'
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

        console.log(props)
    }, [props.activity, props.criterias, props.contestants, props.scoresheet])

    const inputOnChange = (arrayIndex:number, sheetIndex:number, newScore:number) => {
      newScore = Number.isNaN(newScore) ? 0 : newScore

      setContestants(prevState => {
        const updatedContestantRecord = [...prevState];
        updatedContestantRecord[arrayIndex].scoresheet[sheetIndex].score = newScore > 100 ? 100 : newScore
        return updatedContestantRecord;
      })
    }

    const test = () => {
      console.log(contestants)
    }

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
                Please contact administrator
            </div>
        :   <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th>Contestant</th>
                    {criterias.map((criteria,index) => 
                      <th key={index} className='text-center'>
                        <div className='uppercase'>{criteria.criteria + ' ' + criteria.percentage + '%'}</div>
                        <div className='text-lg'>(1-100)</div>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {contestants.map((contestant,index) => 
                    <tr key={index}>
                      <th>{contestant.contestant}</th>
                      {contestant.scoresheet.map((sheet,sheetIndex) => 
                        <th key={sheetIndex} className='text-center'>
                          <input 
                            type="text" 
                            value={sheet.score} 
                            onChange={(e) => inputOnChange(index, sheetIndex ,Number(e.target.value))}
                            className="input input-xs input-bordered w-full max-w-12 text-center" />
                        </th>
                      )}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
        }

        <div className="w-full flex justify-end gap-1 mt-4">
          <button className="btn btn-outline" onClick={() => test()}>Save</button>
          <button className="btn btn-primary" onClick={() => test()}>Submit Scoresheet</button>
        </div>
    </div>
  )
}

export default JudgePage