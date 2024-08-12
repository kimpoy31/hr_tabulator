import React, { useState } from 'react'

const NewJudgeModal = () => {

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const openModal = () => {
        const modal = document.getElementById('newJudgeModal');
        if (modal) {
          (modal as HTMLDialogElement).showModal();
        }
    };

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        
    }

  return (
    <>
        <button className="btn btn-primary btn-xs" onClick={()=>openModal()}>Add new</button>
        <dialog id="newJudgeModal" className="modal">
        <div className="modal-box max-w-sm">
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="text-lg font-bold">Insert judge</h3>
            <form onSubmit={(e) => onSubmit(e)}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Fullname</span>
                    </div>
                    <input 
                        type="text" 
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="input input-sm input-bordered w-full" 
                    />
                </label>
                <div className="flex sm:flex-row flex-col gap-2">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Username</span>
                        </div>
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input input-sm input-bordered w-full" 
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-sm input-bordered w-full" 
                        />
                    </label>
                </div>
                <button type='submit' className="btn btn-primary btn-sm w-full mt-5">Create</button>
            </form>
        </div>
        </dialog>
    </>
  )
}

export default NewJudgeModal