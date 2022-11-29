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
import axios, { AxiosError } from 'axios';


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
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        toast.error(error.response.data.message, toastConfig);
      } else {
        toast.error('Houve um erro inesperado ao cadastrar usuário.', toastConfig);
      }
    } finally {
      nProgress.done();
    }
  }

  const getUsers = async (page: number) => {
    try {
      nProgress.start();
      API.defaults.headers.common['Authorization'] = token;
      const { data } = await API.get(`/usuario/listAllUsers?paginaQueEuQuero=${(page - 1)}&tamanhoDeRegistrosPorPagina=10`);
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

  const updateUser = async (data:TUser, idUsuario: number, cargo:string) => {
    try {
      nProgress.start();
      API.defaults.headers.common['Authorization'] = token;
      await API.put(`/usuario/editar?id=${idUsuario}&cargo=${cargo}`, data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error('Houve um erro inesperado ao listar os clientes.', toastConfig);
      
    } finally{
      nProgress.done();
    }
  }

  const deleteUser = async (idUsuario: number) => {
    try {
        nProgress.start();
        await API.delete(`/usuario/deletar/${idUsuario}`); 
        toast.success('Usuário deletado com sucesso!', toastConfig);
        await getUsers(1);
        navigate('/usuarios');
    } catch (error) {
        console.log(error);
        toast.error('Houve um erro inesperado ao deletar usuário.', toastConfig);
    } finally {
        nProgress.done();
    }
}


  return (
    <UserContext.Provider value={{ users, createUser, getUsers, totalPages, updateUser, deleteUser, setUsers }}>
      {children}
    </UserContext.Provider>
  )

}

