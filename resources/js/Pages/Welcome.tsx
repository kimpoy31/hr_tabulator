import { Activity, Contestant, Criteria, PageProps, User } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { MdLogout } from 'react-icons/md'

interface ScoreRecordProp {
  judge_id:number,  
  criteria_id:number,
  activity_id:number,
  contestant_id:number,
  score:number
}

const Welcome = () => {
  const { props } = usePage<PageProps>()

  const [activity, setActivity] = useState<Activity | undefined>()
  const [criterias, setCriterias] = useState<Criteria[]>([])
  const [contestants, setContestants] = useState<Contestant[]>([])
  const [scoreRecord, setScoreRecord] = useState<ScoreRecordProp[][]>([])

  useEffect(() => {
    setActivity(props.activity)
    setCriterias(props.criterias)
    setContestants(props.contestants)
  }, [props.activity, props.criterias, props.contestants])

  useEffect(() => {
    if (contestants.length > 0 && criterias.length > 0) {
      setScoreRecord(
        contestants.map((contestant) => 
          criterias.map(criteria => ({
            judge_id: props.auth.user.id,
            criteria_id: criteria.id,
            activity_id: props.activity.id,
            contestant_id: contestant.id ,
            score: 0,
          }))
        )
      )
    }
  }, [contestants, criterias, props.auth.user.id, props.activity.id])

  const handleScoreChange = (
    contestantIndex: number, 
    criteriaIndex: number, 
    newScore: number
  ) => {
    setScoreRecord(prevScoreRecord => {
      const updatedScoreRecord = [...prevScoreRecord];
      updatedScoreRecord[contestantIndex][criteriaIndex] = {
        ...updatedScoreRecord[contestantIndex][criteriaIndex],
        score: newScore > 100 ? 100 : newScore 
      };
      return updatedScoreRecord;
    });
  };

  const handleSave = async() => {
    console.log(scoreRecord);

    try {
      const response = await axios.post(route('score.create', { scoreRecord }))
      if(response){
        console.log(response)
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

      <div className="overflow-x-auto border mt-2">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Contestant</th>
              {criterias.map((criteria,index) => 
                <th key={index} className='text-center'>
                  <h1 className="uppercase">{ criteria.criteria + ' ' + criteria.percentage}%</h1>
                  <p className="font-bold text-lg">(1-100)</p>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {contestants && contestants.map((contestant,contestantIndex) => 
              <tr key={contestantIndex}>
                <th className="font-bold text-lg">{contestant.contestant}</th>
                {criterias.map((criteria, criteriaIndex) => (
                  <th key={criteriaIndex} className='text-center'>
                    {scoreRecord[contestantIndex] && scoreRecord[contestantIndex][criteriaIndex] ? (
                      <input
                        type="text"
                        value={scoreRecord[contestantIndex][criteriaIndex].score}
                        className="input input-xs input-bordered w-full max-w-11 text-center"
                        onChange={(e) => handleScoreChange(contestantIndex, criteriaIndex, Number(e.target.value))}
                        placeholder={criteria.criteria}
                      />
                    ) : (
                      <input
                        type="text"
                        value={20}
                        className="input input-xs input-bordered w-full max-w-11 text-center"
                        placeholder={criteria.criteria}
                        disabled
                      />
                    )}
                  </th>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
        
      <div className="w-full flex justify-end mt-4 gap-1">
        <button className="btn btn-outline btn-primary text-white uppercase" onClick={() => handleSave()}>Save</button>
        <button className="btn btn-primary text-white uppercase">submit scoresheet</button>
      </div>
    </div>
  )
}

export default Welcome