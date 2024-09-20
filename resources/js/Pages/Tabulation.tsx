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
    const [currentJudgeTotalScores, setCurrentJudgeTotalScores] = useState<number[]>([])
    
    const filteredContestants = filterScoresheets(contestants)

    function filterScoresheets(contestants:Contestant[]) {
        return contestants.map(contestant => ({
          ...contestant,
          submittedScoresheet: contestant.submittedScoresheet.filter(scoreSheet => scoreSheet.judge_id === judge?.id),
          totalAverage: contestant.totalAverage.filter(average => average.judge_id === judge?.id),
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
    function getRanking(score: number, scores: number[], unfiltered?:boolean) {
      console.log(score)
      // Sort the scores array in descending order
      const sortedScores = [...scores].sort((a, b) => b - a);
    
      // Find the index of the score in the sorted array
      const index = sortedScores.findIndex(s => s === score);
     
      // Check if there are other scores in the same rank
      const rank = sortedScores.indexOf(score) + 1; // Rank starts from 1
    
      return rank;
    }

    useEffect(() => {
        setContestants(props.contestants)
        getOverallComputedScores(props.contestants)
        setCriterias(props.criterias)
        setJudge(props.judge)
        setActivity(props.activity)
        processContestants(props.contestants)

        console.log(props)
    },[])

    // ***
    // *
    // *
    // ****************************************************
    // BELOW ARE FUNCTIONS AND VARIABLES FOR RANK BASED   *
    // ****************************************************
    const [isPointBased, setIsPointBased] = useState<boolean>(false)
    const [groupedScores, setGroupedScores] = useState<number[][]>([]);
    const [groupedScoresByRank, setGroupedScoresByRank] = useState<(number)[][]>([]);
    const [summedScores, setSummedScores] = useState<(number)[]>([]);

    const processContestants = (contestants: Contestant[]) => {
      // Create a 2D array to hold grouped scores
      const scoresByIndex: number[][] = [];
      const scoresByIndexByRank: (number)[][] = [];
  
      // Iterate through each contestant
      contestants.forEach(contestant => {
        contestant.totalAverage.forEach((avg, index) => {
          // Ensure there is a sub-array for each index
          if (!scoresByIndex[index]) {
            scoresByIndex[index] = [];
          }
          // Push the totalScore into the appropriate sub-array
          scoresByIndex[index].push(avg.totalScore);
        });
      });
  
      // Calculate rankings and populate the ranks array
      scoresByIndex.forEach((scores, index) => {
        // Get the rankings for each score
        const rankedScores: (number)[] = scores.map(score => getRanking(score, scores));
        scoresByIndexByRank[index] = rankedScores;
      });
  
      // Update the state with the grouped scores and ranked scores
      setGroupedScores(scoresByIndex);
      setGroupedScoresByRank(scoresByIndexByRank);
    };

    const calculateSums = (scoresByIndex: number[][]) => {
      const sums: number[] = [];
  
      // Determine the maximum length of sub-arrays to handle uneven lengths
      const maxLength = Math.max(...scoresByIndex.map(arr => arr.length));
  
      for (let i = 0; i < maxLength; i++) {
        let sum = 0;
        for (let j = 0; j < scoresByIndex.length; j++) {
          if (scoresByIndex[j][i] !== undefined) {
            sum += scoresByIndex[j][i];
          }
        }
        sums.push(sum);
      }
  
      setSummedScores(sums);
    };

    const getCurrentJudgeTotalScores = () => {
      const tempArray:number[] = []

      filteredContestants.map(contestant => {
        contestant.totalAverage.map(average => {
          tempArray.push(average.totalScore)
        })
      })

      setCurrentJudgeTotalScores(tempArray)
    }

    useEffect(() => {
      calculateSums(groupedScoresByRank)
      getCurrentJudgeTotalScores()
    },[groupedScoresByRank])

  return (
    <div 
      className='lg:px-8 px-4 pt-8  h-screen'
      style={{
        backgroundImage: 'url("/images/pcsaBG.png")',
        backgroundSize: 'cover', // or 'contain', depending on your needs
        backgroundPosition: 'center', // adjusts the image position
        backgroundRepeat: 'no-repeat', // prevents the image from repeating
      }}
    >
        <div className='mb-4 flex items-start justify-between'>
          <div>
            <div className='text-3xl uppercase font-extrabold'>{  activity?.activity }</div>
            <div className='text-lg text-gray-500 uppercase font-extrabold'>{  activity?.description }</div>
          </div>
          <div className='flex gap-4'>
            <img src="/images/cscLogo.jpg" alt="cscLogo" className='max-h-14' />
            <img src="/images/themeLogo.jpg" alt="themeLogo" className='max-h-14' />
          </div>
        </div>

        <div className="overflow-x-auto">
   
            <h3 className="font-bold text-lg uppercase mb-2">Tabulation sheet</h3>
            
            <div className='max-w-36'>
              <label className="label cursor-pointer">
                  <span className="label-text uppercase">{isPointBased ? 'point' : 'rank' } based</span>
                  <input 
                    type="checkbox" 
                    className="toggle toggle-sm toggle-primary" 
                    checked={isPointBased} 
                    onChange={(e) => setIsPointBased(e.target.checked)} 
                  />
              </label>
            </div>
            
          <table className="table table-sm">
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
                    <th key={index}>
                      {isPointBased 
                        ?   total.totalScore 
                        :   getRanking(total.totalScore, groupedScores[index]) === 0 ? 'tie' : getRanking(total.totalScore, groupedScores[index])
                      }
                    </th>
                    )}
                    <th className='text-indigo-800'>{
                      isPointBased
                      ?   (Math.round(contestant.overallTotalAverage * 1000) / 1000)
                      :    summedScores[index]
                      }</th>
                    <th className='text-violet-600'>{getRanking((Math.round(contestant.overallTotalAverage * 1000) / 1000) , overallComputedScores)}</th>
                </tr>
                )}
            </tbody>
          </table>
        </div>

        {contestants.length === 0 || criterias.length === 0
        ?   <div className='w-full text-center p-8 bg-slate-100 mt-4 shadow-md uppercase font-bold'>
                Please contact administrator
            </div>
        :   <div className="overflow-x-auto my-8">
                <h3 className="font-bold text-lg uppercase mb-2">{judge?.fullname}</h3>
              <table className="table table-sm border-collapse">
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
                    <th>Rank</th>
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
                      <th className='text-xs text-indigo-700'>{getRanking(calculateTotalComputedScore(contestant),currentJudgeTotalScores,true)}</th>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
        }


        <div className="flex flex-col text-center items-center max-w-56 my-16">
            <hr className="w-full border-t-2 border-gray-900 " />
            <p className='uppercase text-xs font-bold'>Judge signature</p>
        </div>

    </div>
  )
}

export default Tabulation