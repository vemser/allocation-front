import { TChildren, TUser, TUserContext } from '../../util/types';
import { createContext, useState } from "react";
import { IUserForm } from '../../util/interface';
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';


export const UserContext = createContext({} as TUserContext);

export const UserProvider = ({ children }: TChildren) => {

  const [users, setUsers] = useState<TUser[]>([]); //lista para armazenar os usuários cadastrados

  const createUser = async (data: IUserForm) => {
    try {
      console.log(data);
      if (data.senha !== data.confirmarSenha) {
        toast.error('As senhas digitadas não conferem.', toastConfig);
        return;
      }

      if (!data.email.includes('@dbccompany.com.br')) {
        toast.error('Permitido somente e-mail do domínio @dbccompany.com.br', toastConfig);
        return;
      }

      toast.success("Usuário cadastrado com sucesso!", toastConfig);

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

