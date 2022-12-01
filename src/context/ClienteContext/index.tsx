import { TChildren, TClienteContext, TCliente } from '../../util/types';
import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';
import { API } from '../../util/api';
import nProgress from 'nprogress';
import { AuthContext } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ClienteContext = createContext({} as TClienteContext);

export const ClienteProvider = ({ children }: TChildren) => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState<TCliente[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const { token } = useContext(AuthContext);

    const createCliente = async (data: TCliente) => {
        try {
            console.log(JSON.stringify(data));
            nProgress.start();

            API.defaults.headers.common['Authorization'] = token;
            await API.post(`/cliente`, {
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                situacao: data.situacao
            });
            toast.success("Cliente cadastrado com sucesso!", toastConfig);
            navigate('/clientes');

        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao cadastrar o cliente.', toastConfig);
        }finally{
            nProgress.done();
        }
    }

    const getClientes = async (page: number) => {
        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            const { data } = await API.get(`/cliente?pagina=${(page-1)}&tamanho=20`);
            setClientes(data.elementos);//a API retorna um objeto no qual os clientes estão no array elementos
            setTotalPages(data.quantidadePaginas);
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao buscar os clientes.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const updateCliente = async (data: TCliente, idCliente: number) => {
        try {
            nProgress.start();
            await API.put(`/cliente/${idCliente}`, data);
            toast.success('Cliente atualizado com sucesso!', toastConfig);
            await getClientes(1);
            navigate('/clientes');
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao buscar os clientes.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const deleteCliente = async (idCliente: number) => {
        try {
            nProgress.start();
            await API.delete(`/cliente/${idCliente}`);
            toast.success('Cliente deletado com sucesso!', toastConfig);
            await getClientes(1);
            navigate('/clientes');
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao deletar cliente.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    return (
        <ClienteContext.Provider value={{ clientes, createCliente, getClientes, updateCliente, deleteCliente, totalPages, setClientes }}>
            {children}
        </ClienteContext.Provider>
    )

}

