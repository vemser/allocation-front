import { createContext, useContext, useState } from "react";
import { TChildren, TSenha, TSenhaContext } from '../../util/types';
import { toastConfig } from "../../util/toast";
import { toast } from "react-toastify";
import nProgress from "nprogress";
import { useNavigate } from "react-router-dom";
import { API } from "../../util/api";


export const SenhaContext = createContext({} as TSenhaContext)

export const SenhaProvider = ({ children }: TChildren)=>{

  const navigate = useNavigate()

  const enviarEmail = async (email : TSenha)=>{   
    try{
        nProgress.start();       
        await API.post("/recuperar-senha", email)   
        toast.success("E-mail enviado com sucesso!", toastConfig);
        navigate('/')        
    } catch (error){
        toast.error('Houve algum erro, tente novamente mais tarde.', toastConfig)
    } finally {
        nProgress.done();
    }

}

const enviarSenha = async (email : TSenha)=>{   
  try{
      nProgress.start();       
      // await API.post("/recuperar-senha", email)     
      console.log(email)   
      toast.success("E-mail enviado com sucesso!", toastConfig);
      navigate('/')
      
  } catch (error){
      toast.error('Houve algum erro, tente novamente mais tarde.', toastConfig)
  } finally {
      nProgress.done();
  }

}

    return (
        <SenhaContext.Provider value={{enviarEmail, enviarSenha}}>
        {children}
      </SenhaContext.Provider>
    )
}