import { TChildren, TAvaliacaoContext, TAvaliacao} from '../../util/types';
import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';


export const AvaliacaoContext = createContext({} as TAvaliacaoContext);

export const AvaliacaoProvider = ({ children }: TChildren) => {

    const [avaliacoes, setAvaliacoes] = useState<TAvaliacao[]>([]); 
    const createAvaliacao = async (data: TAvaliacao) => {
        try {
            console.log(data);
            toast.success("Avaliação cadastrada com sucesso!", toastConfig);

        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao cadastrar a avaliacao.', toastConfig);
        }
    }
    const updateAvaliacao = async (data: TAvaliacao) => {
        try {
            console.log(data);
            toast.success("Avaliação editada com sucesso!", toastConfig);

        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao editar avaliacao.', toastConfig);
        }
    }
    return (
        <AvaliacaoContext.Provider value={{ avaliacoes, createAvaliacao, updateAvaliacao }}>
            {children}
        </AvaliacaoContext.Provider>
    )

}

