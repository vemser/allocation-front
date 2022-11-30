import { TChildren, TUser, TUserContext, TVaga, TVagaContext } from '../../util/types';
import { createContext, useContext, useState } from "react";
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

    const [vagas, setVagas] = useState<TVaga[]>([]);
    const createVaga = async (data: IVagaForm) => {
        data.situacao = data.situacao.toUpperCase();
        try {
            nProgress.start();
            console.log(data);
            toast.success("Vaga cadastrado com sucesso!", toastConfig);
            // navigate('/painel-vagas');

        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao cadastrar vaga.', toastConfig);
        } finally{
            nProgress.done();
        }
    }

    const getVagas = async ()=> {
        
    }

    const deleteVaga = async (id: number)=> {

    }


    getVagas()
    return (
        <VagaContext.Provider value={{ vagas, createVaga, deleteVaga }}>
            {children}
        </VagaContext.Provider>
    )

}

