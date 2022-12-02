import nProgress from "nprogress";
import { createContext, useState } from "react";
import { API } from "../../util/api";
import { TAlunoContext, TChildren, TAluno } from "../../util/types";
import { toastConfig } from "../../util/toast";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const AlunoContext = createContext({} as TAlunoContext);

export const AlunoProvider = ({ children }: TChildren) =>{
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [tecnologias, setTecnologias] = useState<string[]>([])

    const [alunos, setAlunos] = useState<TAluno[]>([]);
    const [totalPages, setTotalPages] = useState(0);
        
    const handleCreateAluno = async (aluno : TAluno)=>{        
        
        aluno.tecnologias = tecnologias;   
        aluno.idPrograma = Number(aluno.idPrograma)  
        
        try{
            nProgress.start();
            API.defaults.headers.common["Authorization"] = token;
            await API.post("/aluno", aluno)        
            toast.success("Aluno cadastrado com sucesso!", toastConfig);
            setTecnologias([]);
            navigate('/dash-alunos');
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

    const updateAluno = async (data: TAluno, idAluno: number) => {
        data.tecnologias = tecnologias;     
        data.idPrograma = Number(data.idPrograma);
       
        try {
            nProgress.start();
            await API.put(`/aluno/${idAluno}`, data);
            toast.success('Aluno atualizado com sucesso!', toastConfig);
            await getAlunos(1);
            console.log(data)
            setTecnologias([]);
            navigate('/alunos');
        } catch (error) {
            console.log(error);           
            toast.error('Houve um erro inesperado ao tentar atualizar o Aluno.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const deleteAluno = async (idAluno: number) => {
        try {
            nProgress.start();
            await API.delete(`/aluno/${idAluno}`);
            toast.success('Aluno deletado com sucesso!', toastConfig);
            await getAlunos(1);
            navigate('/dash-alunos');
        } catch (error) {
            console.log(error);
            toast.error('Houve um erro inesperado ao deletar Aluno.', toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const buscarNome = async(nome : string, page: number)=> {
        // API.defaults.headers.common['Authorization'] = token;
        // const { data } = await API.get(`aluno/nome/${nome}?pagina=${(page - 1)}&tamanho=8`);
    }

    const buscarEmail = async (email: string, page: number)=> {
        // API.defaults.headers.common['Authorization'] = token;
        // const { data } = await API.get(`aluno/email/${nome}?pagina=${(page - 1)}&tamanho=8`);
    }

    return(
        <AlunoContext.Provider value={{handleCreateAluno, tecnologias, setTecnologias, deleteAluno, updateAluno, alunos, getAlunos, totalPages}}>
            {children}
        </AlunoContext.Provider>
    )
}