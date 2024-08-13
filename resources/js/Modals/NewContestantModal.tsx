import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { useRef, useState } from "react";

const NewContestantModal = () => {
    const { props } = usePage<PageProps>();

    const [contestant, setContestant] = useState<string>('')
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const openModal = () => {
        const modal = document.getElementById('newContestantModal');
        if (modal) {
          (modal as HTMLDialogElement).showModal();
        }
    };

    const clearValues = () => {
        setContestant('');
    }

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(closeButtonRef.current){
            closeButtonRef.current.click();
        }
    }

  return (
    <>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-primary btn-xs" onClick={() => openModal()}>Add new</button>
        <dialog id="newContestantModal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" ref={closeButtonRef}>✕</button>
                </form>
                <h3 className="font-bold text-lg">New contestant</h3>
                <form onSubmit={(e) => onSubmit(e)}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Contestant Name</span>
                        </div>
                        <input 
                            type="text" 
                            value={contestant}
                            onChange={(e) => setContestant(e.target.value)}
                            className="input input-bordered w-full" 
                            required
                        />
                    </label>

                    <button className="btn btn-primary w-full btn-sm mt-4" type="submit">Add</button>
                </form>
            </div>
        </dialog>
    </>
  )
}

export default NewContestantModal