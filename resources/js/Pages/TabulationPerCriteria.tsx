import { Activity, Contestant, Criteria, PageProps, UserInformation } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const TabulationPerCriteria = () => {
    const { props } = usePage<PageProps>();

    const [criterias, setCriterias] = useState<Criteria[]>([]);
    const [judges, setJudges] = useState<UserInformation[]>([]);
    const [contestants, setContestants] = useState<Contestant[]>([]);
    const [activity, setActivity] = useState<Activity>();
    const [isPointBased, setIsPointBased] = useState<boolean>(false)

    useEffect(() => {
        setContestants(props.contestants);
        setCriterias(props.criterias);
        setJudges(props.judges);
        setActivity(props.activity);
    }, [props]);

    // Function to calculate total scores for each contestant and rank them
    const getRankedContestants = (criteriaId: number) => {
        // Compute total scores and sort contestants
        const contestantScores = contestants.map(contestant => {
            const filteredScores = contestant.submittedScoresheet.filter(score => score.criteria_id === criteriaId);
            const totalScore = filteredScores.reduce((sum, score) => sum + score.score, 0);
    
            // Compute rankedTotal for the contestant
            let rankedTotal = 0;
            filteredScores.forEach((score) => {
                const scoreRanks = getGroupedRankedScores(criteriaId)[filteredScores.indexOf(score)];
                rankedTotal += getRanking(score.score, scoreRanks);
            });
    
            return {
                ...contestant,
                totalScore,
                rankedTotal // Add rankedTotal to contestant
            };
        });
    
        // Sort contestants by total score in descending order
        const sortedContestants = contestantScores.sort((a, b) => b.totalScore - a.totalScore);
    
        // Assign ranks based on sorted scores
        return sortedContestants.map((contestant, index) => ({
            ...contestant,
            rank: index + 1, // Rank starts from 1
        }));
    };

    const getGroupedRankedScores = (criteriaId: number) => {
        // Initialize the groupedScores as an empty 2D array
        const groupedScores: number[][] = [];
        // let rankedTotal: number = 0;
    
        // Iterate over each contestant
        contestants.forEach((contestant, contestantIndex) => {
            // Filter scores for the given criteriaId
            const filteredScores = contestant.submittedScoresheet.filter(score => score.criteria_id === criteriaId);
    
            // Iterate over the filtered scores and group them by index
            filteredScores.forEach((score, index) => {
                if (!groupedScores[index]) {
                    // If the inner array does not exist, initialize it
                    groupedScores[index] = [];
                }
                // Push the score into the appropriate inner array
                groupedScores[index].push(score.score);
            });
        });
    
        return groupedScores;
    };

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
            className='lg:px-8 px-4 pt-8 h-screen'
            style={{
                backgroundImage: 'url("/images/pcsaBG.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
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
            {criterias.map((criteria, criteriaIndex) => {
                const rankedContestants = getRankedContestants(criteria.id);
                const groupedScores = getGroupedRankedScores(criteria.id);
    
                return (
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
                                {rankedContestants.map((contestant, contestantIndex) => {
                                    const filteredScores = contestant.submittedScoresheet.filter(score => score.criteria_id === criteria.id);
    
                                    return (
                                        <tr className="border" key={contestantIndex}>
                                            <th>{contestant.contestant}</th>
                                            {filteredScores.map((score, index) => 
                                                <td key={index}> 
                                                    { isPointBased ? score.score : getRanking(score.score, groupedScores[index] ) } 
                                                </td>
                                            )}
                                            <td>{isPointBased ? Math.round((contestant.totalScore / judges.length) * 1000) / 1000 : contestant.rankedTotal }</td>
                                            <td>{contestant.rank}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
};

export default TabulationPerCriteria;