import React, { createContext, useState, useEffect } from "react";

import { 
    onAuthStateChangedListener,
    createUserDocumentFromAuth }
from "../utils/firebase/firebase.utils";

// the actual value the app needs to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
    
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user, "from user listener");
            if ( user ) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}