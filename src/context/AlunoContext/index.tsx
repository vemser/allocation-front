import nProgress from "nprogress";
import { createContext, useEffect, useState } from "react";
import { API } from "../../util/api";
import { toastConfig } from "../../util/toast";
import { TAlunoContext, TChildren, TAluno } from "../../util/types";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

export const AlunoContext = createContext({} as TAlunoContext);

export const AlunoProvider = ({ children }: TChildren) =>{
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [ radioValue, setRadioValue] = useState<string>('');

    const [tecnologias, setTecnologias] = useState<string[]>([])

    const [alunos, setAlunos] = useState<TAluno[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    
    const handleCreateAluno = async (aluno : TAluno)=>{
        aluno.area = radioValue;
        aluno.area = aluno.area.toUpperCase();
        aluno.tecnologias = tecnologias;
     
        aluno.idPrograma = 3;
        try{
            nProgress.start();
            API.defaults.headers.common["Authorization"] = token;
            await API.post("/aluno", aluno)        
            toast.success("Aluno cadastrado com sucesso!", toastConfig);
            console.log(aluno);
            setTecnologias([]);
            // navigate('/alunos');
        } catch (error){
            toast.error('Houve algum erro, tente novamente mais tarde.', toastConfig)
        } finally {
            nProgress.done();
        }

    }

    const getAlunos = async (page: number) => {
        try {
            nProgress.start();
            API.defaults.headers.common['Authorization'] = token;
            const { data } = await API.get(`/aluno?pagina=${(page - 1)}&tamanho=8`);
            setAlunos(data.elementos)            
            setTotalPages(data.quantidadePaginas);
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao buscar os Alunos.', toastConfig);
        } finally {
            nProgress.done();
        }
    }  

    const updateAluno = async (data: TAluno, idCliente: number) => {
        try {
            nProgress.start();
            await API.put(`/cliente/${idCliente}`, data);
            toast.success('Cliente atualizado com sucesso!', toastConfig);
            await getAlunos(1);
            navigate('/alunos');
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao buscar os clientes.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const deleteAluno = async (idAluno: number) => {
        try {
            nProgress.start();
            await API.delete(`/aluno/${idAluno}`);
            toast.success('Cliente deletado com sucesso!', toastConfig);
            await getAlunos(1);
            navigate('/dash-alunos');
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao deletar cliente.', toastConfig);
        } finally {
            nProgress.done();
        }
    }


    return(
        <AlunoContext.Provider value={{handleCreateAluno, setRadioValue, radioValue, tecnologias, setTecnologias, deleteAluno, updateAluno, alunos, getAlunos, totalPages}}>
            {children}
        </AlunoContext.Provider>
    )
}