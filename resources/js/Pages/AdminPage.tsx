import useFetchActivities from '@/Hooks/useFetchActivities'
import NewActivityModal from '@/Modals/NewActivityModal'

const AdminPage = () => {

    const { activities } = useFetchActivities();

  return (
    <div className='w-full h-screen flex justify-center'>

       <div className="max-w-screen-md w-full flex flex-col py-4 gap-2">

            <div>
                <NewActivityModal />
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
                            {activities.map((activity, index) => 
                                <tr>
                                    <td>{activity.activity}</td>
                                    <td>{activity.description}</td>
                                    <td className='text-end'>Blue</td>
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
