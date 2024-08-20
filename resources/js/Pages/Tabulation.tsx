import { PageProps, UserInformation } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'

const Tabulation = () => {
    
    const { props } = usePage<PageProps>();
    const activityInfo = props.activity;
    const judgeInfo = props.judge

    const [judge, setJudge] = useState<UserInformation>()

    useEffect(() => {
        console.log(props)
    },[])

  return (
    <div>Tabulation
    </div>
  )
}

export default Tabulation