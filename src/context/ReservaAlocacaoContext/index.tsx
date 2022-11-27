import { TChildren, TReservaAlocacao, TReservaAlocacaoContext } from '../../util/types';
import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';


export const ReservaAlocacaoContext = createContext({} as TReservaAlocacaoContext);

export const ReservaAlocacaoProvider = ({ children }: TChildren) => {

    const [reservasAlocacoes, setReservasAlocacoes] = useState<TReservaAlocacao[]>([]); //lista para armazenar os usuários cadastrados

    const createReservaAlocacao = async (data: TReservaAlocacao) => {
        try {
            console.log(data);
            toast.success("Reserva/alocação cadastrado com sucesso!", toastConfig);

        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao cadastrar a Reserva/alocação .', toastConfig);
        }
    }
    return (
        <ReservaAlocacaoContext.Provider value={{ reservasAlocacoes, createReservaAlocacao }}>
            {children}
        </ReservaAlocacaoContext.Provider>
    )

}
