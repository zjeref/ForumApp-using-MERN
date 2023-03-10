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
                signed_user: action.payload
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

export function formatTimeSinceCreation(createdAt) {
    const now = new Date();
    const diff = now - new Date(createdAt);

    // Convert milliseconds to minutes and hours
    const minutesAgo = Math.floor(diff / (1000 * 60));
    const hoursAgo = Math.floor(diff / (1000 * 60 * 60));

    // Return the appropriate string based on how long ago the timestamp was
    if (minutesAgo < 60) {
        return `${minutesAgo} mins ago`;
    } else if (hoursAgo < 24) {
        return `${hoursAgo} hrs ago`;
    } else {
        // If it's been more than a day, return the formatted date
        return new Date(createdAt).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
    }
}

