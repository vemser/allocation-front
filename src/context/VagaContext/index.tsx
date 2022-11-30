import { TChildren, TUser, TUserContext, TVaga, TVagaContext } from '../../util/types';
import { createContext, useContext, useEffect, useState } from "react";
import { IUserForm, IVagaForm } from '../../util/interface';
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';
import nProgress from 'nprogress';
import { useNavigate } from 'react-router-dom';
import { API } from '../../util/api';
import { AuthContext } from '../AuthContext/AuthContext';


export const VagaContext = createContext({} as TVagaContext);

export const VagaProvider = ({ children }: TChildren) => {
    let navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const [totalPages, setTotalPages] = useState(0);

    const [vagas, setVagas] = useState<TVaga[]>([]);
    
    const createVaga = async (data: IVagaForm) => {
        data.situacao = data.situacao.toUpperCase();
        try {
            nProgress.start();
            toast.success("Vaga cadastrado com sucesso!", toastConfig);
            console.log(data);
            // navigate('/painel-vagas');            

        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao cadastrar vaga.', toastConfig);
        } finally{
            nProgress.done();
        }
    }

    const getVagas = async (page: number)=> {
        try{
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            const { data } = await API.get(`/vaga?pagina=${(page-1)}&tamanho=8`);
            setVagas(data.elementos);
            setTotalPages(data.quantidadePaginas);
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao buscar as vagas.', toastConfig);
        } finally {
            nProgress.done();
        }
    } 

    const updateVaga = async (data: IVagaForm, idVaga: number) => {
        try {
            // nProgress.start();
            // await API.put(`/vaga/${idVaga}`, data);
            toast.success('Vaga atualizada com sucesso!', toastConfig);
            console.log(idVaga)
            await getVagas(1);
            navigate('/vagas');
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
            console.log(idVaga)
            API.defaults.headers.common['Authorization'] = token;
            await API.delete(`/vaga/${idVaga}`);
            toast.success('VAga deletada com sucesso!', toastConfig);
            await getVagas(1);
            navigate('/painel-vagas');
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao deletar a vaga.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    return (
        <VagaContext.Provider value={{ vagas, createVaga, deleteVaga, getVagas, updateVaga, totalPages }}>
            {children}
        </VagaContext.Provider>
    )

}

