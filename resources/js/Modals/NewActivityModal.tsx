import React, { useState } from 'react'

const NewActivityModal = () => {
    const [activity, setActivity] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const openModal = () => {
        const modal = document.getElementById('my_modal_3');
        if (modal) {
          (modal as HTMLDialogElement).showModal();
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    }

  return (
    <>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-primary btn-sm" onClick={()=>openModal()}>New Activity</button>
        
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box max-w-sm">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">New Activity</h3>


                <form className="card-body p-0" onSubmit={(e) => onSubmit(e)}>
                    {/* <h2 className="card-title"></h2> */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Activity name</span>
                        </div>
                        <input 
                            type="text" 
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            className="input input-bordered w-full" 
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="textarea textarea-bordered w-full" 
                        />
                    </label>

                    <div className="card-actions justify-end mt-2">
                        <button className="btn btn-primary w-full">Create</button>
                    </div>
                </form>

            </div>
        </dialog>
    </>
  )
}

export default NewActivityModal