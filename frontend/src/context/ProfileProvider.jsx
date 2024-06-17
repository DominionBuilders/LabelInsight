import { ProfileContext } from "./ProfileContext"
import React, { useState } from 'react';

export function ProfileProvider({children}){

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    return(
        <ProfileContext.Provider value={{user,setUser,profile,setProfile}}>
            {children}
        </ProfileContext.Provider>
    );
} 