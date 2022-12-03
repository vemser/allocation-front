import { TChildren, TUser, TUserContext } from '../../util/types';
import { createContext, useContext, useState } from "react";
import { IUser, IUserForm } from '../../util/interface';
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';
import { API } from '../../util/api';
import nProgress from 'nprogress';
import { AuthContext } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DateRange, SendSharp } from '@mui/icons-material';
import axios, { AxiosError } from 'axios';
import { string } from 'yup';


export const UserContext = createContext({} as TUserContext);

export const UserProvider = ({ children }: TChildren) => {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState<IUser[]>([]); //lista para armazenar os usuários cadastrados
  const { isLogged, token, uploadImage } = useContext(AuthContext);

  const createUser = async (data: TUser, cargo?: string, image?: File) => {
    nProgress.start();
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

      await API.post(`/auth/register${(cargo ? "?cargo=" + cargo : "")}`,
        data);

      if (image) {
        const formData = new FormData();
        formData.append("file", image, image.name)
        await uploadImage(data.email, formData);
        console.log(image);
      }

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
      const { data } = await API.get(`/usuario/listAllUsers?pagina=${(page - 1)}&tamanho=20`);
      setUsers(data.elementos);
      setTotalPages(data.quantidadePaginas);
    } catch (error) {
      console.log(error);
      toast.error('Houve um erro inesperado ao listar os clientes.', toastConfig);
    } finally {
      nProgress.done();
    }
  }

  const updateUser = async (data: TUser, idUsuario: number, cargo: string, image?: File) => {
    try {
      nProgress.start();
      API.defaults.headers.common['Authorization'] = token;
      let user = {
      };

      if (!data.email.includes('@dbccompany.com.br')) {
        toast.error('Permitido somente e-mail do domínio @dbccompany.com.br', toastConfig);
        return;
      }
      if (!data.senha) {
        user = {
          nomeCompleto: data.nomeCompleto,
          email: data.email
        }
      } else {
        if (data.senha !== data.senhaIgual) {
          toast.error('As senhas digitadas não conferem.', toastConfig);
          return;
        }
        user = { ...data };
      }
      console.log(user, idUsuario, cargo);
      await API.put(`/usuario/${idUsuario}?cargo=${cargo}`, user);
      if (image) {
        const formData = new FormData();
        formData.append("file", image, image.name)
        await uploadImage(data.email, formData);
        console.log(image);
      }
      // console.log(data);
      toast.success('Usuário editado com sucesso!', toastConfig);
      await getUsers(1);
      // navigate('/usuarios');
    } catch (error) {
      console.log(error);
      toast.error('Houve um erro inesperado ao editar o usuário.', toastConfig);

    } finally {
      nProgress.done();
    }
  }

  const deleteUser = async (idUsuario: number) => {
    try {
      nProgress.start();
      await API.delete(`/usuario/${idUsuario}`);
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
    <UserContext.Provider value={{ users, createUser, getUsers, totalPages, updateUser, deleteUser, setUsers}}>
      {children}
    </UserContext.Provider>
  )

}

