import { createContext, useContext, useState } from 'react';
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
    const [userLogged, setUserLogged] = useState<IUserLogged>(JSON.parse(localStorage.getItem('userLogged') || "{}"));


    const handleUserLogin = async (user: TAuth) => {
        user.email = user.email.toLowerCase()
        try {
            nProgress.start();
            const { data } = await API.post('/auth', user);
            localStorage.setItem('token', data);
            setToken(data);
            API.defaults.headers.common['Authorization'] = data;
            await handleUserLogged(); //busco as informações do usuario

        } catch (error) {
            console.error(error)
            toast.error('Usuário ou senha inválidos', toastConfig);
        } finally {
            nProgress.done()
        }

    }

    const handleUserLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem("userLogged");
        API.defaults.headers.common['Authorization'] = undefined;
        setToken('');
        navigate('/'); // Provisório enquanto não tem token
    }

    // retorna os dados do usuário logado no sistema
    const handleUserLogged = async () => {
        const { data } = await API.get("/auth/logged");
        const imagem = await getImageUser(data.email);
        setUserLogged({ ...data, image: imagem });
        localStorage.setItem("userLogged", JSON.stringify({ ...data, image: imagem }));
        if (data && data.cargos.length === 0) {
            toast.error('Usuário sem permissão. Verifique com o Administrador.', toastConfig);
            handleUserLogout();
        } else {
            navigate('/painel-vagas');
        }
    }

    const uploadImage = async (email: string, formData: FormData) => {
        try {
            await API.post(`/auth/upload/?email=${email}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data;"
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getImageUser = async (email: string): Promise<string> => {
        try {
            const { data } = await API.get(`/usuario?email=${email}`);
            return data;
        } catch (error) {
        }
        return "";
    }

    return (
        <AuthContext.Provider value={{
            handleUserLogin,
            token,
            handleUserLogout,
            isLogged,
            handleUserLogged,
            userLogged,
            uploadImage,
            getImageUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}    