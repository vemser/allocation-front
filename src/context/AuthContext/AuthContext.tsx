import { createContext, useState } from 'react';
import { TAuthContext, TChildren, TAuth } from '../../util/types';
import nProgress from 'nprogress';

import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';

import { useNavigate } from 'react-router-dom';
import { API } from '../../util/api';
import { IUserLogged } from '../../util/interface';


export const AuthContext = createContext({} as TAuthContext);

export const AuthProvider = ({ children }: TChildren) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
    const isLogged = token !== undefined && token !== "";  //camada de segurança para não expor a token
    const [userLogged, setUserLogged] = useState<IUserLogged>();

    const handleUserLogin = async (user: TAuth) => {
        user.email = user.email.toLowerCase()
        try {
            nProgress.start();
            const { data } = await API.post('/auth', user);
            localStorage.setItem('token', data);
            setToken(data);
            API.defaults.headers.common['Authorization'] = "Bearer " + data;
            await handleUserLogged(); //busco as informações do usuario
            console.log(userLogged);
            

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
        navigate('/'); // Provisório enquanto não tem token
    }

    // retorna os dados do usuário logado no sistema
    const handleUserLogged = async () => {
        const { data } = await API.get("/auth/logged");
        setUserLogged(data);
        console.log(userLogged);
        if (data && data.cargos.length === 0) {
            toast.error('Usuário sem permissão. Verifique com o Administrador.', toastConfig);
            handleUserLogout();
        } else {
            navigate('/painel-vagas');
        }
    }


    return (
        <AuthContext.Provider value={{
            handleUserLogin,
            token,
            handleUserLogout,
            isLogged,
            handleUserLogged,
            userLogged
        }}>
            {children}
        </AuthContext.Provider>
    )
}    