import { TChildren, TPrograma, TProgramaContext } from '../../util/types';
import { createContext, useState } from "react";
import { IProgramaForm } from '../../util/interface';
import { toast } from 'react-toastify';
import { toastConfig } from '../../util/toast';
import nProgress from 'nprogress';


export const ProgramaContext = createContext({} as TProgramaContext);

export const ProgramaProvider = ({ children }: TChildren) => {

    const [programas, setProgramas] = useState<TPrograma[]>([]); //lista para armazenar os usuários cadastrados

    const createPrograma = async (data: IProgramaForm) => {
        try {
            nProgress.start();
            console.log(data);
            toast.success("Programa cadastrado com sucesso!", toastConfig);

        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao cadastrar o programa.', toastConfig);
        }
        finally{
            nProgress.done();
        }
    }
    return (
        <ProgramaContext.Provider value={{ programas, createPrograma }}>
            {children}
        </ProgramaContext.Provider>
    )

}

