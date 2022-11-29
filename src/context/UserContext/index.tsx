import { TChildren, TUser, TUserContext } from '../../util/types';
import { createContext, useContext, useState } from "react";
import { IUserForm } from '../../util/interface';
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';
import { API } from '../../util/api';
import nProgress from 'nprogress';
import { AuthContext } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DateRange, SendSharp } from '@mui/icons-material';


export const UserContext = createContext({} as TUserContext);

export const UserProvider = ({ children }: TChildren) => {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState<TUser[]>([]); //lista para armazenar os usuários cadastrados
  const { isLogged, token } = useContext(AuthContext);

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
      await API.post(`/auth/register${(cargo ? "?cargo=" + cargo : "")}`,
        {
          nomeCompleto: data.nomeCompleto,
          email: data.email,
          senha: data.senha,
          senhaIgual: data.senhaIgual
        });
      toast.success("Usuário cadastrado com sucesso!", toastConfig);
      if (!isLogged) {  //usuário publico vai para login
        navigate('/');
      } else {
        navigate('/usuarios');
      }

    } catch (error) {
      console.log(error);
      toast.error('Houve um erro inesperado ao cadastrar usuário.', toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const getUsers= async (page: number) => {
    try {
        nProgress.start();
        API.defaults.headers.common['Authorization'] = token;
        const { data } = await API.get(`/usuario/listAllUsers?paginaQueEuQuero=${(page-1)}&tamanhoDeRegistrosPorPagina=10`);
        console.log(data);
        setUsers(data.elementos);
        setTotalPages(data.quantidadePaginas);
    } catch (error) {
        console.log(error);
        toast.error('Houve um erro inesperado ao listar os clientes.', toastConfig);
    } finally {
        nProgress.done();
    }
}



  return (
    <UserContext.Provider value={{ users, createUser, getUsers, totalPages }}>
      {children}
    </UserContext.Provider>
  )

}

