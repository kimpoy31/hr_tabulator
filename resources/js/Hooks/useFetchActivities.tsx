// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// const useFetchActivities = () => {

//     const [activities, setActivities] = useState<{id:number, activity:string, description:string}[]>([]);

//     const fetchActivities = async () => {
//         const response = await axios.get(route('activity.fetchAll'));

//         if(response){
//             setActivities(response.data.activities);
//         }
//     }

//     useEffect(() => {
//         fetchActivities();
//     },[])

//   return { activities }
// }

// export default useFetchActivities