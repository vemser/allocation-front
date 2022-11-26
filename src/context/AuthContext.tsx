import { createContext, useState } from 'react';
import { TAuthContext, TChildren, TUser } from '../util/types';
import nProgress from 'nprogress';

import { toast } from 'react-toastify';
import { toastConfig } from '../util/toast';

import { useNavigate } from 'react-router-dom';
import { API } from '../util/api';


export const AuthContext = createContext({} as TAuthContext);

export const AuthProvider = ({ children }: TChildren) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string>(localStorage.getItem('token')|| '')

    const handleUserLogin = async(user: TUser)=> {
        try {
            nProgress.start();
            // const { data } = await API.post('/auth', user);
            // localStorage.setItem('token', data);
            // setToken(data);
            navigate('/');

        } catch (error) {
            console.error(error)
            // toast.error('Usuário ou senha inválidos', toastConfig);
        } finally {
            nProgress.done()
        }
        toast.error('Usuário ou senha inválidos', toastConfig);
        console.log(user);
    }

    return (
        <AuthContext.Provider value={{handleUserLogin}}>
            {children}
        </AuthContext.Provider>
    )
}    