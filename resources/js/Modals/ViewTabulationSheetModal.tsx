import { Contestant, PageProps, Score, UserInformation } from "@/types";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";

const ViewTabulationSheetModal = ({contestants, judge} : {contestants:Contestant[], judge:UserInformation}) => {  
    
  const [judgeInfo, setJudgeInfo] = useState<UserInformation|undefined>()

  const [count, setCount] = useState(0)

  useEffect(() => {
    setJudgeInfo(judge)
  },[judge])

  const openModal = () => {
    const modal = document.getElementById('viewTabulationModal');
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }  
  };

  return (
    <>
      <button className="btn btn-primary btn-square btn-xs" onClick={()=>{openModal()}}><FaRegEye /></button>
      <dialog id="viewTabulationModal" className="modal">
          <div className="modal-box w-full max-w-screen-md flex flex-col gap-4">
              <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>

            <div className="overflow-x-auto">
              <h3 className="font-bold text-lg uppercase mb-2">Tabulation sheet {judgeInfo?.fullname}</h3>
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