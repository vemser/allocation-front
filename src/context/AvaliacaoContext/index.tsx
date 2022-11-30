import { TChildren, TAvaliacaoContext, TAvaliacao} from '../../util/types';
import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';
import nProgress from 'nprogress';


export const AvaliacaoContext = createContext({} as TAvaliacaoContext);

export const AvaliacaoProvider = ({ children }: TChildren) => {

    const [avaliacoes, setAvaliacoes] = useState<TAvaliacao[]>([]); 
    const createAvaliacao = async (data: TAvaliacao) => {
        try {
            nProgress.start();
            console.log(data);
            toast.success("Avaliação cadastrada com sucesso!", toastConfig);

        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao cadastrar a avaliacao.', toastConfig);
        }finally{
            nProgress.done();
        }
    }
    const updateAvaliacao = async (data: TAvaliacao) => {
        try {
            nProgress.start();
            console.log(data);
            toast.success("Avaliação editada com sucesso!", toastConfig);

        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao editar avaliacao.', toastConfig);
        }
        finally{
            nProgress.done();
        }
    }

    const deleteAvaliacao = async (id: number) => {
        try {
            console.log(id);
            nProgress.start();
            toast.success("Avaliação deletada com sucesso!", toastConfig);

        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao deletar avaliacao.', toastConfig);
        }
        finally{
            nProgress.done();
        }
    }

    return (
        <AvaliacaoContext.Provider value={{ avaliacoes, createAvaliacao, updateAvaliacao, deleteAvaliacao }}>
            {children}
        </AvaliacaoContext.Provider>
    )

}

