import { createContext } from "react";
import { TAlunoContext, TChildren, TAluno } from "../../util/types";

export const AlunoContext = createContext({} as TAlunoContext);

export const AlunoProvider = ({ children }: TChildren) =>{

    const handleCreateAluno = async (aluno : TAluno)=>{
        aluno.tipoVaga = aluno.tipoVaga.toLowerCase()
        console.log(aluno);
    }

    return(
        <AlunoContext.Provider value={{handleCreateAluno}}>
            {children}
        </AlunoContext.Provider>
    )
}