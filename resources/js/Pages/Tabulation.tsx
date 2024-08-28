import { Activity, Contestant, Criteria, PageProps, UserInformation } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'

const Tabulation = () => {
    
    const { props } = usePage<PageProps>();
    const judges = props.judges;

    const [contestants, setContestants] = useState<Contestant[]>([])
    const [criterias, setCriterias] = useState<Criteria[]>([])
    const [judge, setJudge] = useState<UserInformation>()
    const [activity, setActivity] = useState<Activity>()
    const [overallComputedScores, setOverallComputedScores] = useState<number[]>([])
    
    const filteredContestants = filterScoresheets(contestants)

    function filterScoresheets(contestants:Contestant[]) {
        return contestants.map(contestant => ({
          ...contestant,
          submittedScoresheet: contestant.submittedScoresheet.filter(scoreSheet => scoreSheet.judge_id === judge?.id)
        }));
    }

    function calculateTotalComputedScore(contestant:Contestant) {
        return contestant.submittedScoresheet.reduce((total, score) => total + score.computedScore, 0);
    }

    const getOverallComputedScores = (contestants: Contestant[]) => {
      // Calculate the overall computed scores for all contestants
      const scores = contestants.map((contestant) => {
        const totalScore = calculateTotalComputedScore(contestant);
        const averageScore = totalScore / judges.length;
        return Math.round(averageScore * 1000) / 1000; // Round to 3 decimal places
      });
      
      // Update the state with the new scores
      setOverallComputedScores(scores);
    };

    // function that determines the ranking order
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
        setContestants(props.contestants)
        getOverallComputedScores(props.contestants)
        setCriterias(props.criterias)
        setJudge(props.judge)
        setActivity(props.activity)
    },[])

    useEffect(() => {
      console.log(overallComputedScores)
    },[contestants])

  return (
    <div className='lg:px-32 px-4 pt-8'>
        <div className='mb-4'>
          <div className='text-3xl uppercase font-extrabold'>{  activity?.activity }</div>
          <div className='text-lg text-gray-500 uppercase font-extrabold'>{  activity?.description }</div>
        </div>

        <div className="overflow-x-auto">
            <h3 className="font-bold text-lg uppercase mb-2">Tabulation sheet</h3>
            <table className="table">
            <thead>
                <tr className="border">
                <th>Contestant</th>
                {judges.map((info,index) => 
                    <th key={index}>
                    Judge {index + 1}
                    </th>
                )}
                <th className='text-indigo-800'>Total</th>
                <th className='text-indigo-800'>Rank</th>
                </tr>
            </thead>
            <tbody>
                {contestants.map((contestant,index) => 
                <tr className="border" key={index}>
                    <th className='uppercase text-sm'>{contestant.contestant}</th>
                    {contestant.totalAverage.map((total,index) => 
                    <th key={index}>{total.totalScore}</th>
                    )}
                    <th className='text-indigo-800'>{(Math.round(contestant.overallTotalAverage * 1000) / 1000)}</th>
                    <th className='text-indigo-800'>{getRanking((Math.round(contestant.overallTotalAverage * 1000) / 1000) , overallComputedScores)}</th>
                </tr>
                )}
            </tbody>
            </table>
        </div>



        {contestants.length === 0 || criterias.length === 0
        ?   <div className='w-full text-center p-8 bg-slate-100 mt-4 shadow-md uppercase font-bold'>
                Please contact administrator
            </div>
        :   <div className="overflow-x-auto mt-8">
                <h3 className="font-bold text-lg uppercase mb-2">{judge?.fullname}</h3>
              <table className="table table-sm">
                <thead>
                  <tr className="border">
                    <th>Contestant</th>
                    {criterias.map((criteria,index) => 
                      <th key={index} className='text-xs'>
                        <div className='uppercase'>{criteria.criteria + ' ' + criteria.percentage + '%'}</div>
                        <div>(1-{activity?.scoringRange.range})</div>
                      </th>
                    )}
                    <th>
                        <div className='uppercase'>Total</div>
                        <div>(1-{activity?.scoringRange.range})</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContestants.map((contestant,index) => 
                    <tr key={index} className="border">
                      <th className='uppercase text-sm  '>{contestant.contestant}</th>
                      {contestant.submittedScoresheet.map((sheet,sheetIndex) => 
                        <th key={sheetIndex} className='text-center text-xs'>
                          <p className='flex'><span className="text-indigo-700">{sheet.score}</span><span className='text-xs'>/ {activity?.scoringRange.range} x {sheet.criteriaInformation.percentage} x {activity?.scoringRange.range} = {(Math.round(sheet.computedScore * 1000) / 1000)} </span> </p>
                        </th>
                      )}
                      <th className='text-xs text-indigo-700'>{calculateTotalComputedScore(contestant)}</th>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
        }

        <div className="flex flex-col text-center items-center max-w-56 my-20">
            <hr className="w-full border-t border-gray-900 " />
            <p className='uppercase text-xs'>Judge signature</p>
        </div>

    </div>
  )
}

export default Tabulation