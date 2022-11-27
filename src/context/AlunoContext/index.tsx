import { createContext, useState } from "react";
import { TAlunoContext, TChildren, TAluno } from "../../util/types";

export const AlunoContext = createContext({} as TAlunoContext);

export const AlunoProvider = ({ children }: TChildren) =>{

    const [ radioValue, setRadioValue] = useState<any>('');
    
    const handleCreateAluno = async (aluno : TAluno)=>{        
        aluno.tipoVaga = radioValue;
        console.log(aluno);
    }

    return(
        <AlunoContext.Provider value={{handleCreateAluno, setRadioValue, radioValue}}>
            {children}
        </AlunoContext.Provider>
    )
}