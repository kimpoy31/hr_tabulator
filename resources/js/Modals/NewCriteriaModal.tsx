const NewCriteriaModal = () => {
    
    const openModal = () => {
        const modal = document.getElementById('newCriteriaModal');
        if (modal) {
          (modal as HTMLDialogElement).showModal();
        }
    };

  return (
    <>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-primary btn-xs" onClick={() => openModal()}>Add new</button>
        <dialog id="newCriteriaModal" className="modal">
            <div className="modal-box max-w-sm">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Add Criteria</h3>
                <form className="py-4">

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Criteria</span>
                        </div>
                        <input 
                            type="text" 
                            // value={activity}
                            // onChange={(e) => setActivity(e.target.value)}
                            className="input input-bordered w-full" 
                        />
                    </label>
                    <label className="form-control w-full max-w-24">
                        <div className="label">
                            <span className="label-text">Percentage</span>
                        </div>
                        <input 
                            type="text" 
                            // value={activity}
                            // onChange={(e) => setActivity(e.target.value)}
                            className="input input-bordered w-full" 
                        />
                    </label>
                    <button className="btn btn-sm btn-primary w-full mt-4">Create</button>
                </form>
            </div>
        </dialog>
    </>
  )
}

export default NewCriteriaModal