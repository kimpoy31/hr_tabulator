import { Contestant } from '@/types';
import React, { useRef } from 'react'

const ConfirmSubmissionModal = ({ contestants, hasEdited } : { contestants:Contestant[] , hasEdited:boolean } ) => {
    const closeActivityModal = useRef<HTMLButtonElement>(null);

    const openModal = () => {
        const modal = document.getElementById('confirmSubmissionModal');
        if (modal) {
          (modal as HTMLDialogElement).showModal();
        }
    };

    const includesZero = contestants.some(contestant => 
        contestant.scoresheet.some(sheet => sheet.score === 0)
    )

  return (
    <>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-primary" onClick={() => openModal()} disabled={hasEdited} >Submit Scoresheet</button>
        <dialog id="confirmSubmissionModal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" ref={closeActivityModal}>✕</button>
                </form>
                {!includesZero && <h3 className="font-bold text-lg">Please Confirm Submission</h3>}
                {includesZero 
                ? <p className="py-4 font-bold text-center">Scoresheet incomplete</p>
                : <div className='flex flex-col py-4'>
                    <p>Are you sure you want to submit your scoresheet ?</p>
                    <p>You will be logged out</p>
                  </div>
                }
                {/* <div className="mt-1">
                  <button className="btn btn-sm uppercase text-xs">back to scoresheet</button>
                  <button className="btn btn-sm uppercase text-xs">Submit</button>
                </div> */}
            </div>
        </dialog>
    </>
  )
}

export default ConfirmSubmissionModal