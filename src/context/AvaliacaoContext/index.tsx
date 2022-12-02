import { TChildren, TAvaliacaoContext, TAvaliacao } from '../../util/types';
import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';
import nProgress from 'nprogress';
import { useNavigate } from 'react-router-dom';
import { API } from '../../util/api';
import { AuthContext } from '../AuthContext/AuthContext';
import axios from 'axios';
export const AvaliacaoContext = createContext({} as TAvaliacaoContext);


export const AvaliacaoProvider = ({ children }: TChildren) => {
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(0);
    const { token } = useContext(AuthContext);
    const [avaliacoes, setAvaliacoes] = useState<TAvaliacao[]>([]);

    const getAvaliacoes = async (page: number) => {
        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            const { data } = await API.get(`/avaliacao?pagina=${(page - 1)}&tamanho=20`);
            setAvaliacoes(data.elementos);
            setTotalPages(data.quantidadePaginas);
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao buscar as avaliações.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const createAvaliacao = async (data: TAvaliacao) => {
        try {
            console.log(JSON.stringify(data));
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            await API.post(`/avaliacao`, data);
            toast.success("Avaliação cadastrada com sucesso!", toastConfig);
            navigate('/avaliacoes');
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                toast.error(error.response.data.message, toastConfig);
            } else {
                toast.error('Houve um erro inesperado ao cadastrar a avaliação.', toastConfig);
            }
        } finally {
            nProgress.done();
        }
    }
    const updateAvaliacao = async (data: TAvaliacao, idAvaliacao: number) => {
        try {
            nProgress.start();
            console.log(JSON.stringify(data));
            await API.put(`/avaliacao/${idAvaliacao}`, data);
            toast.success('Avaliação atualizada com sucesso!', toastConfig);
            await getAvaliacoes(1);
            navigate('/avaliacoes');
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                toast.error(error.response.data.message, toastConfig);
            } else {
                toast.error('Houve um erro inesperado ao editar a avaliação.', toastConfig);
            }
        } finally {
            nProgress.done();
        }
    }

    const deleteAvaliacao = async (idAvaliacao: number) => {
        try {
            nProgress.start();
            await API.delete(`/avaliacao/${idAvaliacao}`);
            toast.success('Avaliaçao deletada com sucesso!', toastConfig);
            await getAvaliacoes(1);
            navigate('/avaliacoes');
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao deletar avaliação.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const getPesquisaIdAvaliacao = async (idAvaliacao: number) => {
        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            const { data } = await API.get(`/avaliacao/${idAvaliacao}`);
            setAvaliacoes([data]);
            setTotalPages(1);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                toast.error(error.response.data.message, toastConfig);
            } else {
                toast.error('Houve um erro inesperado ao pesquisar avaliacao.', toastConfig);
            }
        } finally {
            nProgress.done();
        }
    }

    return (
        <AvaliacaoContext.Provider value={
            {
                avaliacoes,
                setAvaliacoes,
                createAvaliacao,
                updateAvaliacao,
                deleteAvaliacao,
                getAvaliacoes,
                totalPages,
                getPesquisaIdAvaliacao
            }
        }>
            {children}
        </AvaliacaoContext.Provider>
    )

}

