import { createContext, useState } from 'react';
import { TAuthContext, TChildren, TAuth } from '../../util/types';
import nProgress from 'nprogress';

import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';

import { useNavigate } from 'react-router-dom';
import { API } from '../../util/api';


export const AuthContext = createContext({} as TAuthContext);

export const AuthProvider = ({ children }: TChildren) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string>(localStorage.getItem('token')|| '')

    const handleUserLogin = async(user: TAuth)=> {
        user.email = user.email.toLowerCase()
        try {
            nProgress.start();
            // const { data } = await API.post('/auth', user);
            // localStorage.setItem('token', data);
            // setToken(data);
            navigate('/');

        } catch (error) {
            console.error(error)
            toast.error('Usuário ou senha inválidos', toastConfig);
        } finally {
            nProgress.done()
        }        
        console.log(user);
    }

    const handleUserLogout = () => {
        localStorage.removeItem('token');
        API.defaults.headers.common['Authorization'] = undefined;
        setToken('');
        navigate('/') // Provisório enquanto não tem token
    }

    return (
        <AuthContext.Provider value={{handleUserLogin , token, handleUserLogout }}>
            {children}
        </AuthContext.Provider>
    )
}    