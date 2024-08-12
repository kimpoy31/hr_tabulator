import { Link } from "@inertiajs/react";
import { FaArrowLeftLong } from "react-icons/fa6";

const Activity = () => {
  return (
   
    <div className="w-full md:h-screen bg-base-200 md:px-16 px-4 py-8 overflow-y-scroll">
        <Link href={route('admin')} className='btn btn-sm btn-outline'><FaArrowLeftLong />Admin Dashboard</Link>
        <h1 className='text-3xl uppercase font-extrabold py-4'>Thats my bobords</h1>
        
        {/* Judges and Criteria Here */}
        <div className='flex md:flex-row flex-col gap-6'>
        
            {/* Judges Container here */}
            <div className='w-full max-h-96 md:max-w-96 border p-4 shadow h-fit'>
                <div className="flex justify-between items-center mb-2">
                    <h1 className='text-lg font-bold'>Judges</h1>
                    <button className="btn btn-primary btn-xs">Add new</button>
                </div>

                <div className="overflow-x-auto max-h-72">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th className='flex justify-end'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td>Cy Ganderton</td>
                                <td className='flex justify-end'></td>
                            </tr>
                            <tr>
                                <td>Cy Ganderton</td>
                                <td className='flex justify-end'></td>
                            </tr>
                        
                    
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Judges Container here */}

            {/* Criteria Container */}
            <div className='w-full max-h-96 border p-4 shadow h-fit'>
                <div className="flex justify-between items-center mb-2">
                    <h1 className='text-lg font-bold'>Criteria of Judging</h1>
                    <button className="btn btn-primary btn-xs">Add new</button>
                </div>

                <div className="overflow-x-auto max-h-72">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th className='flex justify-end'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td>Cy Ganderton</td>
                                <td className='flex justify-end'></td>
                            </tr>
                            <tr>
                                <td>Cy Ganderton</td>
                                <td className='flex justify-end'></td>
                            </tr>
                        
                    
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
        {/* Judges and Criteria Here */}
        <div className='w-full max-h-96 border p-4 shadow h-fit mt-6'>
            <div className="flex justify-between items-center mb-2">
                <h1 className='text-lg font-bold'>Contestant and Scores</h1>
                <button className="btn btn-primary btn-xs">Add new</button>
            </div>

            <div className="overflow-x-auto max-h-72">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th className='flex justify-end'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <td>Cy Ganderton</td>
                            <td className='flex justify-end'></td>
                        </tr>
                        <tr>
                            <td>Cy Ganderton</td>
                            <td className='flex justify-end'></td>
                        </tr>
                        <tr>
                            <td>Cy Ganderton</td>
                            <td className='flex justify-end'></td>
                        </tr>
                        <tr>
                            <td>Cy Ganderton</td>
                            <td className='flex justify-end'></td>
                        </tr>
                        <tr>
                            <td>Cy Ganderton</td>
                            <td className='flex justify-end'></td>
                        </tr>
                        <tr>
                            <td>Cy Ganderton</td>
                            <td className='flex justify-end'></td>
                        </tr>
                        <tr>
                            <td>Cy Ganderton</td>
                            <td className='flex justify-end'></td>
                        </tr>
                        <tr>
                            <td>Cy Ganderton</td>
                            <td className='flex justify-end'></td>
                        </tr>
                        <tr>
                            <td>Cy Ganderton</td>
                            <td className='flex justify-end'></td>
                        </tr>
                        <tr>
                            <td>Cy Ganderton</td>
                            <td className='flex justify-end'></td>
                        </tr>
                    
                
                    </tbody>
                </table>
            </div>

        </div>



    </div>
  )
}

export default Activity