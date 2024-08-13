export interface User {
    id: number;
    role: string;
    username: string;
    userInformation:UserInformation;
}

export interface UserInformation {
    user_id: number;
    activity_id: number;
    fullname: string;
    role: 'judge'|'admin';
    status: 'active'|'inactive';
}

export interface Activity {
    id:number;
    activity:string;
    description:string;
    status: 'active'|'inactive';
}

export interface Criteria {
    id:number;
    activity_id: number;
    criteria:string;
    percentage:number;
    status: 'active'|'inactive';
}

export interface Contestant {
    id:number;
    activity_id: number;
    contestant:string;
    status: 'active'|'inactive';
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    activity: Activity
    judges: UserInformation[];
    criterias:Criteria[];
    contestants:Contestant[];
    activities:Activity[];
};
