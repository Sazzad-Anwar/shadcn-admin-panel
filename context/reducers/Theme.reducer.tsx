import { DARK, LIGHT } from '../constants/Theme.constants';

export interface ThemeActionType {
    type: 'DARK' | 'LIGHT';
    payload: string;
}

const ThemeReducer = (state: string, action: ThemeActionType) => {
    switch (action.type) {
        case DARK:
            typeof window !== 'undefined' && window.localStorage.setItem('theme', action.payload);
            return action.payload;
        case LIGHT:
            typeof window !== 'undefined' && window.localStorage.setItem('theme', action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default ThemeReducer;
