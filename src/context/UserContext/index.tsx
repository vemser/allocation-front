import { TChildren, TUser, TUserContext } from '../../util/types';
import { createContext, useContext, useState } from "react";
import { IUserForm } from '../../util/interface';
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';
import { API } from '../../util/api';
import nProgress from 'nprogress';
import { AuthContext } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';


export const UserContext = createContext({} as TUserContext);

export const UserProvider = ({ children }: TChildren) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<TUser[]>([]); //lista para armazenar os usuários cadastrados
  const {isLogged} =  useContext(AuthContext);

  const createUser = async (data: TUser, cargo?: string) => {
    try {
      console.log(JSON.stringify(data));
      if (data.senha !== data.senhaIgual) {
        toast.error('As senhas digitadas não conferem.', toastConfig);
        return;
      }

      if (!data.email.includes('@dbccompany.com.br')) {
        toast.error('Permitido somente e-mail do domínio @dbccompany.com.br', toastConfig);
        return;
      }
      nProgress.start();
      // await API.post(`/usuario/register?cargo=${cargo}`, data);
      toast.success("Usuário cadastrado com sucesso!", toastConfig);
      if(!isLogged) {  //usuário publico vai para login
        navigate('/');
      } else {
        navigate('/usuarios');
      }

    } catch (error) {
      console.log(error);
      toast.error('Houve um erro inesperado ao cadastrar usuário.', toastConfig);
    }
  }
  return (
    <UserContext.Provider value={{ users, createUser }}>
      {children}
    </UserContext.Provider>
  )

}

