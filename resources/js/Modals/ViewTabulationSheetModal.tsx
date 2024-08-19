import { Contestant, PageProps, Score } from "@/types";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface TotalScoreByJudge {
  contestant: string;
  contestant_id: number;
  judge: number;
  judge_id: number;
  totalScores: {
    score:number;
  }[]
}

const ViewTabulationSheetModal = ({contestants, activity_id} : {contestants:Contestant[], activity_id:number}) => {
     const openModal = () => {
        console.log(contestants)

        const modal = document.getElementById('viewTabulationModal');
        if (modal) {
          (modal as HTMLDialogElement).showModal();
        }  
    };

    // function calculateTotalScoresByJudge(scores: Score[]): TotalScoreByJudge[] {
    //   return scores.reduce((acc, score) => {
    //     const { judge_id, computedScore } = score;
    //     const existingEntry = acc.find(item => item.judge_id === judge_id);
    
    //     if (existingEntry) {
    //       existingEntry.totalScore += computedScore;
    //     } else {
    //       acc.push({ judge_id, totalScore: computedScore });
    //     }
    
    //     return acc;
    //   }, [] as TotalScoreByJudge[]);
    // }

  return (
    <>
        <button className="btn bg-indigo-600 text-white btn-sm" onClick={()=>openModal()}>Tabulation sheet</button>
        <dialog id="viewTabulationModal" className="modal">
          <div className="modal-box w-full max-w-screen-md flex flex-col gap-4">
              <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              

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
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                    {contestants.map((contestant,index) => 
                    <tr className="border" key={index}>
                      <th>{contestant.contestant}</th>
                      {contestant.totalAverage.map((total,index) => 
                        <th key={index}>{total.totalScore}</th>
                      )}
                      <th>{contestant.overallTotalAverage}</th>
                    </tr>
                    )}
                </tbody>
              </table>
            </div>

            {/* <div className="overflow-x-auto">
              <h3 className="font-bold text-lg uppercase mb-2">Franz Valencia</h3>
              <table className="table">
                <thead>
                  <tr className="border">
                    <th>Contestant</th>
                    {contestants.map((info,index) => 
                      <th key={index}>
                        Judge {index + 1}
                      </th>
                    )}
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                    {contestants.map((contestant,index) => 
                    <tr className="border" key={index}>
                      <th>{contestant.contestant}</th>
                      {contestant.totalAverage.map((total,index) => 
                        <th key={index}>{total.totalScore}</th>
                      )}
                      <th>{contestant.overallTotalAverage}</th>
                    </tr>
                    )}
                </tbody>
              </table>
            </div> */}
          </div>
        </dialog>
    </>
  )
}

export default ViewTabulationSheetModal