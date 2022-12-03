import { TChildren, TVaga, TVagaContext } from '../../util/types';
import { createContext, useContext, useState } from "react";
import { IVagaForm } from '../../util/interface';
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';
import nProgress from 'nprogress';
import { useNavigate } from 'react-router-dom';
import { API } from '../../util/api';
import { AuthContext } from '../AuthContext/AuthContext';
import axios from 'axios';

export const VagaContext = createContext({} as TVagaContext);

export const VagaProvider = ({ children }: TChildren) => {
    let navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const [totalPages, setTotalPages] = useState(0);

    const [vagas, setVagas] = useState<TVaga[]>([]);

    const createVaga = async (data: IVagaForm) => {
        const dataAberturaFormatada = data.dataAbertura.toLocaleDateString().split('/').reverse().join("-");
        const dataCriacao = new Date().toLocaleDateString().split('/').reverse().join("-");
        data.dataCriacao = dataCriacao;
        data.dataAbertura = dataAberturaFormatada;
        data.quantidadeAlocados = Number(data.quantidadeAlocados);

        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            await API.post(`/vaga`, data);
            toast.success("Vaga cadastrada com sucesso!", toastConfig);
            navigate('/painel-vagas');

        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                if (error.response.data.message) {
                    toast.error(error.response.data.message, toastConfig);
                } else if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
                    toast.error(error.response.data.errors.join("\n"), toastConfig);
                }
            } else {
                toast.error('Houve um erro inesperado ao cadastrar a vaga.', toastConfig);
            }
        } finally {
            nProgress.done();
        }
    }

    const getVagas = async (page: number) => {
        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            const { data } = await API.get(`/vaga?pagina=${(page - 1)}&tamanho=8`);
            setVagas(data.elementos);
            setTotalPages(data.quantidadePaginas);
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao buscar as vagas.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const updateVaga = async (data: IVagaForm, idVaga: number, dataCriacao: string) => {
        const dataAberturaFormatada = data.dataAbertura.toLocaleDateString().split('/').reverse().join("-");
        data.dataCriacao = dataCriacao;
        data.dataAbertura = dataAberturaFormatada;
        data.quantidadeAlocados = Number(data.quantidadeAlocados);

        try {
            nProgress.start();
            console.log(JSON.stringify(data));
            await API.put(`/vaga/${idVaga}`, data);
            toast.success('Vaga atualizada com sucesso!', toastConfig);
            console.log(data)
            await getVagas(1);
            navigate('/painel-vagas');
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao buscar as vagas.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const deleteVaga = async (idVaga: number) => {
        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            await API.delete(`/vaga/${idVaga}`);
            toast.success('Vaga deletada com sucesso!', toastConfig);
            await getVagas(1);
            navigate('/painel-vagas');
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao deletar a vaga.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const getPesquisaIdVagas = async (idVaga: number) => {
        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            const { data } = await API.get(`/vaga/${idVaga}`);
            setVagas([data]);
            setTotalPages(1);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                toast.error(error.response.data.message, toastConfig);
            } else {
                toast.error('Houve um erro inesperado ao pesquisar a vaga.', toastConfig);
            }
        } finally {
            nProgress.done();
        }
    }

    return (
        <VagaContext.Provider value={{ vagas, createVaga, deleteVaga, getVagas, updateVaga, totalPages, getPesquisaIdVagas }}>
            {children}
        </VagaContext.Provider>
    )

}