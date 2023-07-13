import { useLocalStorage } from '../../hooks/useLocalStorage';
import { AUTH_USER_UPDATE, LOGIN, LOGOUT } from '../constants/Auth.constants';
import { AuthUserType, InitialUserStateType } from '../types/context.type';

export type AuthActionType = {
    type: 'LOGIN' | 'LOGOUT' | 'AUTH_USER_UPDATE';
    payload: AuthUserType | null;
};

const AuthReducer = (state: InitialUserStateType, action: AuthActionType) => {
    const { setItem: setUser, removeItem: removeUser } = useLocalStorage<AuthUserType>(
        'user',
        {} as AuthUserType,
    );

    switch (action.type) {
        case LOGIN:
            setUser(action.payload ?? ({} as AuthUserType));
            return { ...state, user: action.payload };
        case LOGOUT:
            setUser({} as AuthUserType);
            return { ...state, user: action.payload };
        case AUTH_USER_UPDATE:
            removeUser('user');
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export default AuthReducer;
