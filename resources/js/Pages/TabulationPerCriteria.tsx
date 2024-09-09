import { Activity, Contestant, Criteria, PageProps, UserInformation } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const TabulationPerCriteria = () => {
    const { props } = usePage<PageProps>();

    const [criterias, setCriterias] = useState<Criteria[]>([]);
    const [judges, setJudges] = useState<UserInformation[]>([]);
    const [contestants, setContestants] = useState<Contestant[]>([]);
    const [totalScoresMap, setTotalScoresMap] = useState<Map<number, number>>(new Map());
    const [activity, setActivity] = useState<Activity>();

    useEffect(() => {
        setCriterias(props.criterias);
        setJudges(props.judges);
        setActivity(props.activity)
        setContestants(props.contestants);
    }, [props]);

    return (
        <div
            className='lg:px-8 px-4 pt-8 h-screen'
            style={{
                backgroundImage: 'url("/images/pcsaBG.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {criterias.map((criteria,criteriaIndex) =>  
                <div key={criteriaIndex} className="mb-4">
                    <div className="flex items-center gap-4">
                        <h3 className="font-bold text-lg uppercase mb-2">{criteria.criteria}</h3>
                        <h3 className="font-bold text-xs uppercase mb-2 text-white bg-black px-2 rounded">{activity?.activity}</h3>
                    </div>

                    <table className="table table-sm border-collapse">
                        <thead>
                            <tr className="border">
                                <th>Contestant</th>
                                {judges.map((info, judgeIndex) =>
                                    <th key={judgeIndex}>Judge {judgeIndex + 1}</th>
                                )}
                                <th>Total</th>
                                <th>Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contestants.map((contestant, contestantIndex) => 
                                <tr className="border" key={contestantIndex}>
                                    <th>{contestant.contestant}</th>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
}

export default TabulationPerCriteria;

    // useEffect(() => {
    //     // Calculate total scores for each contestant
    //     const contestantScores = contestants.map(contestant => {
    //         const totalScore = criterias.reduce((acc, criteria) => {
    //             // Filter the scoresheet for the current criteria
    //             const scoresForCriteria = contestant.submittedScoresheet.filter(score => score.criteria_id === criteria.id);

    //             // Calculate the total score for this criteria (sum up scores for each judge)
    //             return acc + scoresForCriteria.reduce((sum, score) => sum + score.score, 0);
    //         }, 0);

    //         return { id: contestant.id, totalScore };
    //     });

    //     // Create a map of total scores for easy lookup
    //     const totalScores = new Map<number, number>();
    //     contestantScores.forEach(({ id, totalScore }) => totalScores.set(id, totalScore));
    //     setTotalScoresMap(totalScores);
    // }, [contestants, criterias]);

    // function getRanking(score: number, scores: number[]) {
    //     // Sort the scores array in descending order
    //     const sortedScores = [...scores].sort((a, b) => b - a);

    //     // Find the rank of the score
    //     const rank = sortedScores.indexOf(score) + 1; // Rank starts from 1

    //     return rank;
    // }


// {
//     criterias.map((criteria, criteriaIndex) => (
//         <div key={criteriaIndex} className="mb-4">
//             <div className="flex items-center gap-4">
//                 <h3 className="font-bold text-lg uppercase mb-2">{criteria.criteria}</h3>
//                 <h3 className="font-bold text-xs uppercase mb-2 text-white bg-black px-2 rounded">{activity?.activity}</h3>
//             </div>
//             <table className="table table-sm border-collapse">
//                 <thead>
//                     <tr className="border">
//                         <th>Contestant</th>
//                         {judges.map((info, judgeIndex) =>
//                             <th key={judgeIndex}>Judge {judgeIndex + 1}</th>
//                         )}
//                         <th>Total</th>
//                         <th>Rank</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {contestants.map((contestant, contestantIndex) => {
//                         // Initialize an array to store scores for each judge
//                         const scoresForJudges: number[] = [];

//                         // Filter the scoresheet for the current criteria
//                         const scoresForCriteria = contestant.submittedScoresheet.filter(score => score.criteria_id === criteria.id);

//                         // Calculate the total score for this criteria
//                         const totalScore = scoresForCriteria.reduce((acc, score) => acc + score.score, 0);

//                         // Populate the scoresForJudges array
//                         judges.forEach((judge) => {
//                             // Find the score for the current judge
//                             const score = scoresForCriteria.find(score => score.judge_id === judge.id);
//                             scoresForJudges.push(score ? score.score : 0); // Use 0 if no score found
//                         });

//                         // Calculate the overall score for the contestant
//                         const overallTotalScore = (Math.round(totalScore * 1000) / 1000);

//                         // Create an array of all total scores for ranking calculation
//                         const allTotalScores = contestants.map(contestant => {
//                             const criteriaScores = contestant.submittedScoresheet.filter(score => score.criteria_id === criteria.id);
//                             return criteriaScores.reduce((acc, score) => acc + score.score, 0);
//                         });

//                         return (
//                             <tr className="border" key={contestantIndex}>
//                                 <th>{contestant.contestant}</th>
//                                 {scoresForJudges.map((score, judgeIndex) => (
//                                     <td key={judgeIndex}>{score}</td>
//                                 ))}
//                                 <td>{(Math.round((overallTotalScore / judges.length) * 1000) / 1000)}</td>
//                                 <td>{getRanking(overallTotalScore, allTotalScores)}</td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     ))
// }