import { TChildren, TUser, TUserContext, TVaga, TVagaContext } from '../../util/types';
import { createContext, useState } from "react";
import { IUserForm, IVagaForm } from '../../util/interface';
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';
import nProgress from 'nprogress';


export const VagaContext = createContext({} as TVagaContext);

export const VagaProvider = ({ children }: TChildren) => {

    const [vagas, setVagas] = useState<TVaga[]>([]);
    const createVaga = async (data: IVagaForm) => {
        try {
            nProgress.start();
            console.log(data);
            toast.success("Vaga cadastrado com sucesso!", toastConfig);

        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao cadastrar vaga.', toastConfig);
        } finally{
            nProgress.done();
        }
    }
    return (
        <VagaContext.Provider value={{ vagas, createVaga }}>
            {children}
        </VagaContext.Provider>
    )

}

