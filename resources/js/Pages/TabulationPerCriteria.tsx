import { Contestant, Criteria, PageProps, UserInformation } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const TabulationPerCriteria = () => {
    const { props } = usePage<PageProps>()

    const [criterias, setCriterias] = useState<Criteria[]>([]) 
    const [judges, setJudges] = useState<UserInformation[]>([]) 
    const [contestants, setContestants] = useState<Contestant[]>([]) 

    useEffect(() => {
        setCriterias(props.criterias)
        setJudges(props.judges)
        setContestants(props.contestants)
    },[])

    // function that determines the ranking order
    function getRanking(score: number, scores: number[], unfiltered?:boolean) {
    // Sort the scores array in descending order
    const sortedScores = [...scores].sort((a, b) => b - a);
    
    // Find the index of the score in the sorted array
    const index = sortedScores.findIndex(s => s === score);
    
    // Check if there are other scores in the same rank
    const rank = sortedScores.indexOf(score) + 1; // Rank starts from 1
    
    return rank;
    }

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
         {
          criterias.map((criteria, index) => 
            <div key={index}>
              <h3 className="font-bold text-lg uppercase mb-2">{criteria.criteria}</h3>
              <table className="table table-sm border-collapse">
                <thead>
                  <tr className="border">
                    <th>Contestant</th>
                    {judges.map((info,index)=>
                      <th key={index}>Judge {index + 1}</th>
                    )}
                     <th>Total</th>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {contestants.map((contestant, contestantIndex) => {
                    // Initialize an array to store scores for each judge
                    const scoresForJudges: number[] = [];

                    // Filter the scoresheet for the current criteria
                    const scoresForCriteria = contestant.submittedScoresheet.filter(score => score.criteria_id === criteria.id);

                    // Calculate the total score for this criteria (assuming only one score per criteria)
                    const totalScore = scoresForCriteria.reduce((acc, score) => acc + score.score, 0);

                    // Populate the scoresForJudges array
                    judges.forEach((judge, judgeIndex) => {
                      // Find the score for the current judge
                      const score = scoresForCriteria.find(score => score.judge_id === judge.id);
                      scoresForJudges.push(score ? score.score : 0); // Use 0 if no score found
                    });

                    // console.log('scores' + contestantIndex ,scoresForJudges)
                  

                    return (
                      <tr key={contestantIndex}>
                        <th>{contestant.contestant}</th>
                        {scoresForJudges.map((score, judgeIndex) => (
                          <td key={judgeIndex}>{score}</td>
                        ))}
                        <td>{(Math.round(totalScore / judges.length * 1000) / 1000)}</td>
                        <td>{getRanking((Math.round(totalScore / judges.length * 1000) / 1000), scoresForJudges)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table> 
            </div>
          )
        }
    </div>
  )
}

export default TabulationPerCriteria