import React, { useState } from 'react';
import { ResponseContext } from './ResponseContext';

export const ResponseProvider = ({ children }) => {
    const [Response, setResponse] = useState("response null");

    return (
        <ResponseContext.Provider value={{ Response, setResponse }}>
            {children}
        </ResponseContext.Provider>
    );
};