export type AuthUserType = {
    id?: string;
    email: string;
    userName: string;
    avatar: string;
};

export type InitialUserStateType = {
    user: AuthUserType | null;
};

export type InitialSideBarStateType = {
    isOpen: boolean;
};

export type InitialThemeStateType = string;
