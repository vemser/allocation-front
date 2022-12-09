import { TChildren, TPrograma, TProgramaContext } from '../../util/types';
import { createContext, useContext, useState } from "react";
import { IProgramaForm } from '../../util/interface';
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';
import nProgress from 'nprogress';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import { API } from '../../util/api';
import axios from 'axios';

export const ProgramaContext = createContext({} as TProgramaContext);

export const ProgramaProvider = ({ children }: TChildren) => {
    const navigate = useNavigate();
    const [programas, setProgramas] = useState<TPrograma[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const { token } = useContext(AuthContext);

    const createPrograma = async (data: IProgramaForm) => {
        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            await API.post(`/programa`, data);
            navigate('/programas');
            toast.success("Programa cadastrado com sucesso!", toastConfig);

        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao cadastrar o programa.', toastConfig);
        }
        finally {
            nProgress.done();
        }
    }

    const getProgramas = async (page: number) => {
        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            const { data } = await API.get(`/programa?pagina=${(page - 1)}&tamanho=20`);
            setProgramas(data.elementos);//a API retorna um objeto no qual os programas estão no array elementos
            setTotalPages(data.quantidadePaginas);
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao listar os programas.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const updatePrograma = async (data: IProgramaForm, idPrograma: number) => {
        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            await API.put(`/programa/${idPrograma}`, data);
            await getProgramas(1);
            navigate('/programas');
            toast.success("Programa editado com sucesso!", toastConfig);

        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao editar o programa.', toastConfig);
        }
        finally {
            nProgress.done();
        }
    }

    const deletePrograma = async (idPrograma: number) => {
        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            await API.delete(`/programa/${idPrograma}`);
            await getProgramas(1);
            navigate('/programas');
            toast.success("Programa excluído com sucesso!", toastConfig);

        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                toast.error(error.response.data.message, toastConfig);
            } else {
                toast.error('Houve um erro inesperado ao excluir o programa.', toastConfig);
            }
        }
        finally {
            nProgress.done();
        }
    }

    const getPesquisaNomePrograma = async (nome: string, page: number) => {
        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            const { data } = await API.get(`/programa/nome/${nome}?pagina=${(page - 1)}&tamanho=10`);
            setProgramas(data.elementos);
            setTotalPages(1);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                toast.error(error.response.data.message, toastConfig);
            } else {
                toast.error('Houve um erro inesperado ao pesquisar o programa.', toastConfig);
            }
        } finally {
            nProgress.done();
        }
    }

    return (
        <ProgramaContext.Provider value={
            {
                programas,
                createPrograma,
                getProgramas,
                updatePrograma,
                deletePrograma,
                totalPages,
                setProgramas,
                getPesquisaNomePrograma
            }
        }>
            {children}
        </ProgramaContext.Provider>
    )
}