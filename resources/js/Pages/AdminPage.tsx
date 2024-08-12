import useFetchActivities from '@/Hooks/useFetchActivities'
import NewActivityModal from '@/Modals/NewActivityModal'
import { Activity } from '@/types';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaRegEye } from "react-icons/fa";

const AdminPage = () => {
    // Activities
    const [ eventActivities , setEventActivities ] = useState<Activity[]>([]);
    // Fetch existing activities
    const { activities } = useFetchActivities();

    useEffect(() => {

        setEventActivities( activities );
        
    },[activities])

  return (
    <div className='w-full h-screen flex justify-center'>

       <div className="max-w-screen-md w-full flex flex-col py-4 gap-2">

            <div>
                <NewActivityModal eventActivities={eventActivities} setEventActivities={setEventActivities} />
            </div>

            <div className='p-2 border'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Activity Name</th>
                                <th>Description</th>
                                <th className='text-end'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventActivities.map((activity, index) => 
                                <tr key={index}>
                                    <td>{activity.activity}</td>
                                    <td>{activity.description ?? 'no description'}</td>
                                    <td className='flex justify-end'>
                                        <Link href={route('activity.show', { id: activity.id })} className='btn btn-square btn-sm'><FaRegEye /></Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

       </div>
    </div>
  )
}

export default AdminPage
