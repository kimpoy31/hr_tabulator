import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

const NewCriteriaModal = () => {
    const { props } = usePage<PageProps>();

    const [criteria, setCriteria] = useState<string>('');
    const [percentage, setPercentage] = useState<number>(0);
    
    const openModal = () => {
        const modal = document.getElementById('newCriteriaModal');
        if (modal) {
          (modal as HTMLDialogElement).showModal();
        }
    };

    const handlePercentageInput = (arg:number) => {
        setPercentage( arg > 100 ? 100 : arg );
    }

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await axios.post(route('criteria.create', { activity_id: props.activity.id, criteria, percentage }))
            console.log(response.data.criteria)
        } catch (error) {
            console.log(error)
        }
    }

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
                <form className="py-4" onSubmit={(e) => onSubmit(e)} >

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Criteria</span>
                        </div>
                        <input 
                            type="text" 
                            value={criteria}
                            onChange={(e) => setCriteria(e.target.value)}
                            className="input input-bordered w-full" 
                            required
                        />
                    </label>
                    <label className="form-control w-full max-w-24">
                        <div className="label">
                            <span className="label-text">Percentage</span>
                        </div>
                        <input 
                            type="text" 
                            value={percentage}
                            onChange={(e) => handlePercentageInput(Number(e.target.value))}
                            className="input input-bordered w-full" 
                            required
                        />
                    </label>
                    <button className="btn btn-sm btn-primary w-full mt-4" type="submit">Create</button>
                </form>
            </div>
        </dialog>
    </>
  )
}

export default NewCriteriaModal