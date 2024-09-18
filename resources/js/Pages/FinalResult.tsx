import {
    Activity,
    Contestant,
    Criteria,
    PageProps,
    UserInformation,
} from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

// THIS COMPONENTS IS SPECIFICALLY FOR THATS MY BOBORDS 2024
// THIS COMPONENTS IS SPECIFICALLY FOR THATS MY BOBORDS 2024
// THIS COMPONENTS IS SPECIFICALLY FOR THATS MY BOBORDS 2024
// THIS COMPONENTS IS SPECIFICALLY FOR THATS MY BOBORDS 2024
// THIS COMPONENTS IS SPECIFICALLY FOR THATS MY BOBORDS 2024

const TabulationPerCriteria = () => {
    const { props } = usePage<PageProps>();

    const [criterias, setCriterias] = useState<Criteria[]>([]);
    const [judges, setJudges] = useState<UserInformation[]>([]);
    const [contestants, setContestants] = useState<Contestant[]>([]);
    const [activity, setActivity] = useState<Activity>();

    const scores = contestants.map((contestant) => {
        return contestant.overallTotalAverage;
    });

    useEffect(() => {
        setContestants(props.contestants);
        setCriterias(props.criterias);
        setJudges(props.judges);
        setActivity(props.activity);

        console.log(props.contestants);
    }, [props]);

    const getRankedContestants = (criteriaId: number) => {
        const contestantScores = contestants.map((contestant) => {
            const filteredScores = contestant.submittedScoresheet.filter(
                (score) => score.criteria_id === criteriaId
            );
            const totalScore = filteredScores.reduce(
                (sum, score) => sum + score.score,
                0
            );

            let rankedTotal = 0;
            filteredScores.forEach((score) => {
                const scoreRanks =
                    getGroupedRankedScores(criteriaId)[
                        filteredScores.indexOf(score)
                    ];
                rankedTotal += getRanking(score.score, scoreRanks);
            });

            return {
                ...contestant,
                totalScore,
                rankedTotal,
            };
        });

        const sortedContestants = contestantScores.sort(
            (a, b) => b.totalScore - a.totalScore
        );

        return sortedContestants.map((contestant, index) => ({
            ...contestant,
            rank: index + 1,
        }));
    };

    const getGroupedRankedScores = (criteriaId: number) => {
        const groupedScores: number[][] = [];

        contestants.forEach((contestant) => {
            const filteredScores = contestant.submittedScoresheet.filter(
                (score) => score.criteria_id === criteriaId
            );

            filteredScores.forEach((score, index) => {
                if (!groupedScores[index]) {
                    groupedScores[index] = [];
                }
                groupedScores[index].push(score.score);
            });
        });

        return groupedScores;
    };

    const getRanking = (score: number, scores: number[]) => {
        const sortedScores = [...scores].sort((a, b) => b - a);
        const rank = sortedScores.indexOf(score) + 1;
        return rank;
    };

    return (
        <div className="p-8">
            <div className="flex gap-2 items-center mb-2">
                <div className="uppercase font-bold text-xl badge badge-neutral badge-lg">
                    {activity?.activity}
                </div>
                <div className="uppercase font-bold text-lg">Final Results</div>
            </div>

            <div className="uppercase font-bold text-lg mt-4">
                Winners Per Criterion
            </div>
            {criterias.map((criteria, criteriaIndex) => {
                const rankedContestants = getRankedContestants(criteria.id);
                const topContestant = rankedContestants[0]; // Get the top contestant

                if (!topContestant) return null; // Handle case with no contestants

                const filteredScores = topContestant.submittedScoresheet.filter(
                    (score) => score.criteria_id === criteria.id
                );

                return (
                    <div key={criteriaIndex} className="mb-2 border-b-4 p-2">
                        <div className="flex items-center gap-4">
                            <h3 className="font-bold uppercase text-sm text-gray-700">
                                {criteria.criteria}
                            </h3>
                            :
                            <h3 className="font-bold uppercase text-sm text-red-700">
                                {topContestant.contestant}
                            </h3>
                        </div>
                    </div>
                );
            })}

            <div className="flex items-center gap-4 p-2 mb-2 border-b-4">
                <h3 className="font-bold uppercase text-sm text-gray-700">
                    Thats My Bobords social media award
                </h3>
                :
                <h3 className="font-bold uppercase text-sm text-red-700">
                    Virgie bulandres (cluster 2)
                </h3>
            </div>
            <div className="flex items-center gap-4 p-2 mb-2 border-b-4">
                <h3 className="font-bold uppercase text-sm text-gray-700">
                    Darling of the crowd
                </h3>
                :<h3 className="font-bold uppercase text-sm text-red-700"></h3>
            </div>

            <div className="flex items-center gap-4 p-2 mb-2 border-b-4 bg-blue-200">
                <h3 className="font-bold uppercase text-sm text-gray-700">
                    Thats My Bobords 2024 Winner
                </h3>
                :
                {contestants.map((contestant) => {
                    let rank = getRanking(
                        contestant.overallTotalAverage,
                        scores
                    );

                    return (
                        rank === 1 && (
                            <h3 className="font-bold uppercase text-sm text-red-700 ">
                                {contestant.contestant}
                            </h3>
                        )
                    );
                })}
            </div>
            <div className="flex items-center gap-4 p-2 mb-2 border-b-4 bg-blue-100">
                <h3 className="font-bold uppercase text-sm text-gray-700">
                    Thats My Bobords 2024 1st Runner-up
                </h3>
                :
                {contestants.map((contestant) => {
                    let rank = getRanking(
                        contestant.overallTotalAverage,
                        scores
                    );

                    return (
                        rank === 2 && (
                            <h3 className="font-bold uppercase text-sm text-red-700">
                                {contestant.contestant}
                            </h3>
                        )
                    );
                })}
            </div>
            <div className="flex items-center gap-4 p-2 mb-2 border-b-4 bg-blue-50">
                <h3 className="font-bold uppercase text-sm text-gray-700">
                    Thats My Bobords 2024 2nd Runner-up
                </h3>
                :
                {contestants.map((contestant) => {
                    let rank = getRanking(
                        contestant.overallTotalAverage,
                        scores
                    );

                    return (
                        rank === 3 && (
                            <h3 className="font-bold uppercase text-sm text-red-700">
                                {contestant.contestant}
                            </h3>
                        )
                    );
                })}
            </div>
        </div>
    );
};

export default TabulationPerCriteria;
