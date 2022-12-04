import { TChildren, TReservaAlocacao, TReservaAlocacaoContext, TReservaAlocacaoGet } from '../../util/types';
import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';
import nProgress from 'nprogress';
import { API } from '../../util/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import axios from 'axios';


export const ReservaAlocacaoContext = createContext({} as TReservaAlocacaoContext);

export const ReservaAlocacaoProvider = ({ children }: TChildren) => {
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(0);
    const { token } = useContext(AuthContext);
    const [reservasAlocacoes, setReservasAlocacoes] = useState<TReservaAlocacaoGet[]>([]); //lista para armazenar os usuários cadastrados

    const createReservaAlocacao = async (data: TReservaAlocacao) => {
        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            await API.post(`/reserva-alocacao`, data);
            toast.success("Reserva/alocação cadastrada com sucesso!", toastConfig);
            navigate('/reservas-alocacoes');
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                if (error.response.data.message) {
                    toast.error(error.response.data.message, toastConfig);
                } else if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
                    toast.error(error.response.data.errors.join("\n"), toastConfig);
                }
            } else {
                toast.error('Houve um erro inesperado ao cadastrar a reserva/alocação.', toastConfig);
            }
        } finally {
            nProgress.done();
        }
    }

    const getReservasAlocacoes = async (page: number) => {
        try {

            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            const { data } = await API.get(`/reserva-alocacao?pagina=${(page - 1)}&tamanho=20`);
            setReservasAlocacoes(data.elementos);
            setTotalPages(data.quantidadePaginas);
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao buscar as reservas/alocações.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const updateReservaAlocacao = async (data: TReservaAlocacao, idReservaAlocacao: number) => {
        try {
            nProgress.start();
            await API.put(`/reserva-alocacao/${idReservaAlocacao}`, data);
            toast.success('Reserva/alocação atualizada com sucesso!', toastConfig);
            await getReservasAlocacoes(1);
            navigate('/reservas-alocacoes');
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                if (error.response.data.message) {
                    toast.error(error.response.data.message, toastConfig);
                } else if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
                    toast.error(error.response.data.errors.join("\n"), toastConfig);
                }
            } else {
                toast.error('Houve um erro inesperado ao editar a reserva/alocação.', toastConfig);
            }
        } finally {
            nProgress.done();
        }
    }

    const deleteReservaAlocacao = async (idReservaAlocacao: number) => {
        try {
            nProgress.start();
            await API.delete(`/reserva-alocacao/${idReservaAlocacao}`);
            toast.success('Reserva/alocação desativada com sucesso!', toastConfig);
            await getReservasAlocacoes(1);
            navigate('/reservas-alocacoes');
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                if (error.response.data.message) {
                    toast.error(error.response.data.message, toastConfig);
                } else if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
                    toast.error(error.response.data.errors.join("\n"), toastConfig);
                }
            } else { 
                toast.error('Houve um erro inesperado ao desativar reserva/alocação.', toastConfig); 
            }
        } finally {
            nProgress.done();
        }
    }

    const getPesquisaAlocacao = async (nomeAluno: string, nomeVaga: string, page: number) => {
        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            const { data } = await API.get(`/reserva-alocacao/filtro?pagina=${page - 1}&tamanho=20&nomeAluno=${nomeAluno}&nomeVaga=${nomeVaga}`);
            setReservasAlocacoes(data.elementos);
            setTotalPages(data.quantidadePaginas);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                toast.error(error.response.data.message, toastConfig);
            } else {
                toast.error('Houve um erro inesperado ao pesquisar a Reserva alocação.', toastConfig);
            }
        } finally {
            nProgress.done();
        }
    }

    return (
        <ReservaAlocacaoContext.Provider value={
            {
                reservasAlocacoes,
                createReservaAlocacao,
                getReservasAlocacoes,
                updateReservaAlocacao,
                setReservasAlocacoes,
                deleteReservaAlocacao,
                totalPages,
                getPesquisaAlocacao
            }}>
            {children}
        </ReservaAlocacaoContext.Provider>
    )

}

