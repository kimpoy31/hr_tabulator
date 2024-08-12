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
    role: string;
    status: 'active'|'inactive';
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
