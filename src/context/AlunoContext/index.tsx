import nProgress from "nprogress";
import { createContext, useState } from "react";
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
    
    const handleCreateAluno = async (aluno : TAluno)=>{
        aluno.tipoVaga = radioValue;
        aluno.tipoVaga = aluno.tipoVaga.toUpperCase();
        aluno.tecnologias = tecnologias;
        
        try{
            nProgress.start();
            API.defaults.headers.common["Authorization"] = token;
            await API.post('/aluno', aluno)
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

    return(
        <AlunoContext.Provider value={{handleCreateAluno, setRadioValue, radioValue, tecnologias, setTecnologias}}>
            {children}
        </AlunoContext.Provider>
    )
}