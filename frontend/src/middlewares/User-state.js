import { createContext } from "react";

export const UserContext = createContext();

export const initialState = {
    signed_user: {
    },
    isLoggedIn: false

}

export const reducer = (state, action) => {
    switch (action.type) {
        case "set_user": {
            return {
                ...state,
                signed_user:action.payload
            }
        }

        case "login_status": {
            return {
                ...state,
                isLoggedIn: action.payload
            }
        }
        default: {
            return
        }
    }
}