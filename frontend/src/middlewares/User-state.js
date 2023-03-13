import { createContext, useContext } from "react";

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

    // Convert milliseconds to minutes, hours, days, weeks, months and years
    const minutesAgo = Math.floor(diff / (1000 * 60));
    const hoursAgo = Math.floor(diff / (1000 * 60 * 60));
    const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeksAgo = Math.floor(daysAgo / 7);
    const monthsAgo = Math.floor(daysAgo / 30);
    const yearsAgo = Math.floor(daysAgo / 365);

    // Return the appropriate string based on how long ago the timestamp was
    if (minutesAgo < 60) {
        return `${minutesAgo} mins ago`;
    } else if (hoursAgo < 24) {
        return `${hoursAgo} hrs ago`;
    } else if (daysAgo < 7) {
        return `${daysAgo} days ago`;
    } else if (weeksAgo < 4) {
        return `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`;
    } else if (monthsAgo < 12) {
        return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
    } else if (yearsAgo === 1) {
        return `${yearsAgo} year ago`;
    } else {
        return `${yearsAgo} years ago`;
    }
}


