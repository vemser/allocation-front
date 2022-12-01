import { TChildren, TAvaliacaoContext, TAvaliacao } from '../../util/types';
import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';
import nProgress from 'nprogress';
import { useNavigate } from 'react-router-dom';
import { API } from '../../util/api';
import { AuthContext } from '../AuthContext/AuthContext';
export const AvaliacaoContext = createContext({} as TAvaliacaoContext);


export const AvaliacaoProvider = ({ children }: TChildren) => {
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(0);
    const { token } = useContext(AuthContext);

    const [avaliacoes, setAvaliacoes] = useState<TAvaliacao[]>([]);

    const getAvaliacoes = async (page : number) => {
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
            toast.error('Houve um erro inesperado ao cadastrar a avaliação.', toastConfig);
        }finally{
            nProgress.done();
        }
    }
    const updateAvaliacao = async (data: TAvaliacao, idAvaliacao: number) => {
        try {
            nProgress.start();
            await API.put(`/avaliacao/${idAvaliacao}`, data);
            toast.success('Avalição atualizada com sucesso!', toastConfig);
            await getAvaliacoes(1);
            navigate('/avaliacoes');
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao atualizar avaliação.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const deleteAvaliacao = async (idAvaliacao: number) => {
        try {
            nProgress.start();
            await API.delete(`/avaliacao/${idAvaliacao}`);
            toast.success('Avaliçao deletada com sucesso!', toastConfig);
            await getAvaliacoes(1);
            navigate('/avaliacoes');
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao deletar avaliação.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    return (
        <AvaliacaoContext.Provider value={{ avaliacoes, setAvaliacoes, createAvaliacao, updateAvaliacao, deleteAvaliacao, getAvaliacoes, totalPages }}>
            {children}
        </AvaliacaoContext.Provider>
    )

}

