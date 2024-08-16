import { Contestant, PageProps, Score } from "@/types";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewTabulationSheetModal = ({contestants, activity_id} : {contestants:Contestant[], activity_id:number}) => {

    const [scores, setScores] = useState<Score[]>([])

     const openModal = () => {
        fetchScores()

        const modal = document.getElementById('viewTabulationModal');
        if (modal) {
          (modal as HTMLDialogElement).showModal();
        }  
    };

    const fetchScores = async() => {
      console.log(contestants)

      // try {
      //   const response = await axios.get(route('score.fetch', { activity_id }))
      //   if(response.data){
      //     setScores(response.data.scores)
      //     console.log(response.data.scores)
      //   }
      // } catch (error) {
      //   console.log(error)
      // }
    }

  return (
    <>
        <button className="btn bg-indigo-600 text-white btn-sm" onClick={()=>openModal()}>Tabulation sheet</button>
        <dialog id="viewTabulationModal" className="modal">
        <div className="modal-box w-full max-w-screen-md">
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg uppercase mb-2">Tabulation sheet</h3>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="border">
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </dialog>
    </>
  )
}

export default ViewTabulationSheetModal