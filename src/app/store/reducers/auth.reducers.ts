import { User } from "../../models/user.model";
import { AuthActionTypes, All } from '../actions/auth.actions';

export interface State {
    isAuthenticated: boolean;
    user?: User;
    errorMessage?: string;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
}

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    email: action.payload.email,
                    names: action.payload.names,
                    lastnames: action.payload.lastnames,
                    password: action.payload.password
                },
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'El email o la contraseña son incorrectos.'
            };
        }
        case AuthActionTypes.SIGNUP_SUCCESS: {
            return {
                ...state,
                isAuthenticated: false,
                user: {
                    email: action.payload.email,
                    names: action.payload.names,
                    lastnames: action.payload.names,
                    password: action.payload.password
                },
                errorMessage: null
            };
        }
        case AuthActionTypes.SIGNUP_FAILURE: {
            return {
                ...state,
                errorMessage: 'El email ya se encuentra en registrado.'
            };
        }
        case AuthActionTypes.LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}