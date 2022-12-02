import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { TChildren, TEmail, TSenha, TSenhaContext } from '../../util/types';
import { toastConfig } from "../../util/toast";
import { toast } from "react-toastify";
import nProgress from "nprogress";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../util/api";


export const SenhaContext = createContext({} as TSenhaContext);


export const SenhaProvider = ({ children }: TChildren)=>{

    const [tokenState, setTokenState] = useState<string | null>(null);

  const navigate = useNavigate()

  const enviarEmail = async (data : TEmail)=>{   
    let email = data.email
    try{
        nProgress.start();    
        await API.post("/auth/recuperar-senha", email)   
        toast.success("E-mail enviado com sucesso! Verifique sua caixa de entrada.", toastConfig);
        // navigate('/')        
        console.log(email)
    } catch (error){
        toast.error('Houve algum erro, tente novamente mais tarde.', toastConfig)
    } finally {
        nProgress.done();
    }

}

const enviarSenha = async (senha : TSenha)=>{   
    console.log(tokenState)
  try{
      nProgress.start();       
      // await API.put("/auth/atualizar-senha", senha)     
      console.log(senha)   
      toast.success("Senha alterada com sucesso!", toastConfig);
    //   navigate('/')
      
  } catch (error){
      toast.error('Houve algum erro, tente novamente mais tarde.', toastConfig)
  } finally {
      nProgress.done();
  }

}

    return (
        <SenhaContext.Provider value={{enviarEmail, enviarSenha, tokenState, setTokenState}}>
        {children}
      </SenhaContext.Provider>
    )
}