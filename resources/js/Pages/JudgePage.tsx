import DefaultLayout from '@/Layouts/DefaultLayout'
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
    const [scoringRange, setScoringRange] = useState<number>(0)
    const [minScoringRange, setMinScoringRange] = useState<number>(0)
    const [includesLessScoringRange, setIncludesLessScoringRange] = useState<boolean>(false)
    // below is the array container of all computed scores (used to determine ranks)
    const [scoreArray, setScoreArray] = useState<number[]>([]);

    useEffect(() => {
        setActivity(props.activity)
        setCriterias(props.criterias)
        setContestants(props.contestants)
        setScoringRange(props.activity.scoringRange.range)
        setMinScoringRange(props.activity.scoringRange.range - (25 / 100) * props.activity.scoringRange.range )
    }, [props.activity, props.criterias, props.contestants, props.scoresheet])

    const inputOnChange = (arrayIndex:number, sheetIndex:number, newScore:number) => {
      newScore = Number.isNaN(newScore) ? 0 : newScore
      setIncludesLessScoringRange(newScore < minScoringRange)

      setContestants(prevState => {
        const updatedContestantRecord = [...prevState];
        updatedContestantRecord[arrayIndex].scoresheet[sheetIndex].score = newScore > scoringRange ? scoringRange : newScore
        return updatedContestantRecord;
      })

      setHadEdited(true);
    } 

    const handleSave = async() => {
      await setScoreArray([]);

      try {
        const response = await axios.post(route('score.update'), { contestants })
        if(response.status === 200){
          setHadEdited(false)
        }
      } catch (error) {
        console.log(error)
      }

      const toAppend = contestants.map((contestant) => {
        return calculateComputedValue(contestant.scoresheet)
      })

      setScoreArray(toAppend);
    }

    function calculateComputedValue(scoresheet:Score[]) {
      return scoresheet.reduce((total, sheet) => {
        const score = sheet.score;
        const percentage = sheet.criteriaInformation.percentage;
        return total + (score / scoringRange) * (percentage / scoringRange) * scoringRange;
      }, 0);
    }

    function getRanking(score: number, scores: number[]): string | number {
      // Sort the scores array in descending order
      const sortedScores = [...scores].sort((a, b) => b - a);
    
      // Find the index of the score in the sorted array
      const index = sortedScores.findIndex(s => s === score);
    
      // Check if the score is found in the sorted array
      if (index === -1) {
        return "Score not found";
      }
    
      // Check if there are other scores in the same rank
      const rank = sortedScores.indexOf(score) + 1; // Rank starts from 1
      const isTie = sortedScores.lastIndexOf(score) !== index;
    
      return isTie ? "tie" : rank;
    }    

    useEffect(() => {
      const toAppend = contestants.map((contestant) => {
        return calculateComputedValue(contestant.scoresheet)
      })

      setScoreArray(toAppend);
    },[contestants])

  return (
    <DefaultLayout className='lg:px-32 px-4 py-16'>
        <div className="flex justify-between">
        <div>
          <div className='text-3xl uppercase font-extrabold'>{  props.auth.user.userInformation.fullname }</div>
          <div className='flex items-center gap-1'>
            <div className="badge badge-neutral text-white uppercase">judge</div>
            <div className='uppercase'>{activity?.activity} </div>
          </div>
        </div>
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
                        <div className='text-lg'>({minScoringRange}-{scoringRange})</div>
                      </th>
                    )}
                    <th>Total</th>
                    <th>Rank</th>
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
                            value={sheet.score !== 0 ? sheet.score : ''} 
                            onChange={(e) => inputOnChange(index, sheetIndex ,Number(e.target.value))}
                            className="input input-xs input-bordered w-full max-w-12 text-center" />
                        </th>
                      )}
                      <th> {calculateComputedValue(contestant.scoresheet)} </th> 
                      <th> {hasEdited ? '---' : getRanking(calculateComputedValue(contestant.scoresheet), scoreArray) }  </th>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
        }

        <div className="w-full flex justify-end gap-5 mt-4 items-center">
          {includesLessScoringRange && <p className='uppercase text-red-500'>saving disabled. Scores must be greater or equal to {minScoringRange}</p>}
          <button className="btn bg-indigo-500 text-white" onClick={() => handleSave()} disabled={!hasEdited || includesLessScoringRange} >Save</button>
        </div>
    </DefaultLayout>
  )
}

export default JudgePage