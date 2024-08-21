import NewContestantModal from "@/Modals/NewContestantModal";
import NewCriteriaModal from "@/Modals/NewCriteriaModal";
import NewJudgeModal from "@/Modals/NewJudgeModal";
import { Contestant, Criteria, PageProps, UserInformation } from "@/types";
import { FaMinus } from "react-icons/fa6";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";

const Activity = () => {
    const { props } = usePage<PageProps>();
    const activityInfo = props.activity;

    const [judges, setJudges] = useState<UserInformation[]>([])
    const [criterias, setCriterias] = useState<Criteria[]>([])
    const [contestants, setContestants] = useState<Contestant[]>([])
    const [scoringRange, setScoringRange] = useState<number>(0)
    const [rangeDbValue, setRangeDbValue] = useState<number>(0)
    const [isEditingScoringRange, setIsEditingScoringRange] = useState<boolean>(false)

    const TotalPercentage = criterias.reduce((total, item) => {
        return total + Number(item.percentage);
    }, 0);

    const handleScoringRangeSave = async() => {
        if(isEditingScoringRange && scoringRange !== rangeDbValue){
            const response = await axios.post(route('range.update', { range:scoringRange, id:props.activity.scoringRange.id }))
            if(response.data){
                setRangeDbValue(response.data.updatedRange)
                setScoringRange(response.data.updatedRange)
            }
        }
    }

    useEffect(() => {
        setJudges(props.judges)
        setCriterias(props.criterias)
        setContestants(props.contestants)
        setScoringRange(props.activity.scoringRange.range)
        setRangeDbValue(props.activity.scoringRange.range)
    },[])

  return (
   
    <div className="w-full md:h-screen bg-base-200 md:px-16 px-4 py-8 overflow-y-scroll">
        <Link href={route('admin.show')} className='btn btn-sm btn-outline'><FaArrowLeftLong />Admin Dashboard</Link>
        <div className="flex flex-col gap-0 mb-3">
            <h1 className='text-3xl uppercase font-extrabold pt-4'>{activityInfo.activity}</h1>
            <p>{activityInfo.description}</p>
            <div className="text-sm mt-4 flex gap-2 items-center">
                <button className="btn btn-xs btn-outline" onClick={() => {setIsEditingScoringRange(!isEditingScoringRange); handleScoringRangeSave()}}>{isEditingScoringRange ? "Save" : "Edit"}</button>
                <div className="flex items-center">
                    <div>Scoring range:</div>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-xs text-base w-full max-w-16" 
                        value={scoringRange}
                        onChange={(e)=>setScoringRange(Number(e.target.value))}
                        disabled={!isEditingScoringRange}
                    />
                </div>
            </div>
        </div>

        {/* Judges and Contestants Here */}
        {TotalPercentage === 100
        
        ?   <div className='flex md:flex-row flex-col gap-6'>
            
                {/* Judges Container here */}
                <div className='w-full max-h-96 border p-4 shadow h-fit'>
                    <div className="flex justify-between items-center mb-2">
                        <h1 className='text-lg font-bold'>Judges</h1>
                        <NewJudgeModal judges={judges} setJudges={setJudges} />
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
                                {judges.map((judge,index) =>
                                    <tr key={index}>
                                        <td>{judge.fullname}</td>
                                        <td className='flex justify-end gap-1'>
                                            <a key={index} href={route('activity.judge.tabulation', { activity_id: props.activity.id, judge_id:judge.id })} target="_blank" className="btn btn-outline btn-xs" >
                                                <FaRegEye /> Scoresheet
                                            </a>
                                        </td>
                                    </tr>
                                )}  
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Contestants Container here */}
                <div className='w-full max-h-96 border p-4 shadow h-fit'>
                    <div className="flex justify-between items-center mb-2">
                        <h1 className='text-lg font-bold'>Contestants</h1>
                        <NewContestantModal contestants={contestants} setContestants={setContestants} />
                    </div>

                    <div className="overflow-x-auto max-h-72">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th className='flex justify-end'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contestants.map((contestant,index) => 
                                <tr key={index}>
                                    <td>{contestant.contestant}</td>
                                    <td className='flex justify-end'></td>
                                </tr>
                                )}                   
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

        :   <div className="flex md:flex-row flex-col gap-6 item-center">
                <div className="p-4 shadow-md">
                    Criteria Total must be 100% before you can add Judges & Contestants
                </div>
            </div>
        }
   

        
        

        {/* Criteria Container */}
        <div className='w-full max-h-96 border p-4 shadow h-fit mt-6'>
            <div className="flex justify-between items-center mb-2">
                <h1 className='text-lg font-bold'>Criteria of Judging</h1>
                <NewCriteriaModal criterias={criterias} setCriterias={setCriterias} TotalPercentage={TotalPercentage} />
            </div>

            <div className="overflow-x-auto max-h-72">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Criteria</th>
                            <th>Percentage</th>
                            <th className='flex justify-end'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {criterias.map((criteria, index) => 
                        <tr key={index}>
                            <td>{criteria.criteria}</td>
                            <td>{criteria.percentage}</td>
                            <td className='flex justify-end'></td>
                        </tr>    
                        )}               
                    </tbody>
                </table>
            </div>

        </div>



    </div>
  )
}

export default Activity