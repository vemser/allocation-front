import { createContext } from 'react';
import { TAuthContext, TChildren } from '../util/types';

import { API } from '../util/api';


export const AuthContext = createContext({} as TAuthContext);

export const AuthProvider = ({ children }: TChildren) => {

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}    