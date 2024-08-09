import NewActivityModal from '@/Modals/NewActivityModal'
import React from 'react'

const AdminPage = () => {
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
                            <th>Name</th>
                            <th>Job</th>
                            <th className='text-end'>Favorite Color</th>
                        </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td className='text-end'>Blue</td>
                            </tr>
                            {/* row 1 */}
                            <tr>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td className='text-end'>Blue</td>
                            </tr>
                            {/* row 1 */}
                            <tr>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td className='text-end'>Blue</td>
                            </tr>
                        
                        </tbody>
                    </table>
                </div>
            </div>

       </div>
    </div>
  )
}

export default AdminPage
