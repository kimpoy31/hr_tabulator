import { Contestant, Criteria, PageProps, UserInformation } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'

const Tabulation = () => {
    
    const { props } = usePage<PageProps>();
    const activityInfo = props.activity;

    const [contestants, setContestants] = useState<Contestant[]>([])
    const [criterias, setCriterias] = useState<Criteria[]>([])
    const [judge, setJudge] = useState<UserInformation>()
    
    const filteredContestants = filterScoresheets(contestants,1)

    function filterScoresheets(contestants:Contestant[], judgeId:number) {
        return contestants.map(contestant => ({
          ...contestant,
          submittedScoresheet: contestant.submittedScoresheet.filter(scoreSheet => scoreSheet.judge_id === judge?.id)
        }));
    }

    function calculateTotalComputedScore(contestant:Contestant) {
        return contestant.submittedScoresheet.reduce((total, score) => total + score.computedScore, 0);
    }

    useEffect(() => {
        setContestants(props.contestants)
        setCriterias(props.criterias)
        setJudge(props.judge)
        console.log(props) 
    },[])

  return (
    <div className='lg:px-32 px-4 pt-8'>
        <div className="overflow-x-auto">
            <h3 className="font-bold text-lg uppercase mb-2">Tabulation sheet</h3>
            <table className="table">
            <thead>
                <tr className="border">
                <th>Contestant</th>
                {contestants.map((info,index) => 
                    <th key={index}>
                    Judge {index + 1}
                    </th>
                )}
                <th className='text-indigo-800'>Total</th>
                </tr>
            </thead>
            <tbody>
                {contestants.map((contestant,index) => 
                <tr className="border" key={index}>
                    <th>{contestant.contestant}</th>
                    {contestant.totalAverage.map((total,index) => 
                    <th key={index}>{total.totalScore}</th>
                    )}
                    <th className='text-indigo-800'>{contestant.overallTotalAverage}</th>
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
                        <div>(1-100)</div>
                      </th>
                    )}
                    <th>
                        <div className='uppercase'>Total</div>
                        <div>(100%)</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContestants.map((contestant,index) => 
                    <tr key={index} className="border">
                      <th>{contestant.contestant}</th>
                      {contestant.submittedScoresheet.map((sheet,sheetIndex) => 
                        <th key={sheetIndex} className='text-center text-xs'>
                          <p className='flex'><span className="text-indigo-700">{sheet.score}</span><span className='text-xs'>/ 100 x {sheet.criteriaInformation.percentage} x 100 = {sheet.computedScore} </span> </p>
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