import ConfirmSubmissionModal from '@/Modals/ConfirmSubmissionModal'
import { Activity, Contestant, Criteria, PageProps, Score } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { MdLogout } from 'react-icons/md'

const JudgePage = () => {
    const { props } = usePage<PageProps>()

    const [activity, setActivity] = useState<Activity | undefined>()
    const [criterias, setCriterias] = useState<Criteria[]>([])
    const [contestants, setContestants] = useState<Contestant[]>([])
    const [hasEdited, setHadEdited] = useState<boolean>(false)

    useEffect(() => {
        setActivity(props.activity)
        setCriterias(props.criterias)
        setContestants(props.contestants)
    }, [props.activity, props.criterias, props.contestants, props.scoresheet])

    const inputOnChange = (arrayIndex:number, sheetIndex:number, newScore:number) => {
      newScore = Number.isNaN(newScore) ? 0 : newScore

      setContestants(prevState => {
        const updatedContestantRecord = [...prevState];
        updatedContestantRecord[arrayIndex].scoresheet[sheetIndex].score = newScore > 100 ? 100 : newScore
        return updatedContestantRecord;
      })

      setHadEdited(true);
    }

    const handleSave = async() => {
      try {
        const response = await axios.post(route('score.update', { contestants }))
        if(response.status === 200){
          setHadEdited(false)
        }
      } catch (error) {
        console.log(error)
      }

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
                      <th key={index} className='md:text-center text-end'>
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
                        <th key={sheetIndex} className='md:text-center text-end'>
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
          <button className="btn bg-indigo-500 text-white" onClick={() => handleSave()} disabled={!hasEdited} >Save</button>
        </div>
    </div>
  )
}

export default JudgePage