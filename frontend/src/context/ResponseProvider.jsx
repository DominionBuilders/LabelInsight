import React, { useState } from 'react';
import { ResponseContext } from './ResponseContext';

export const ResponseProvider = ({ children }) => {
    const [Response, setResponse] = useState(null);

    return (
        <ResponseContext.Provider value={{ Response, setResponse }}>
            {children}
        </ResponseContext.Provider>
    );
};