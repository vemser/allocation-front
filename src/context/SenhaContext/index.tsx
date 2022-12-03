import { createContext, useState } from "react";
import { TChildren, TEmail, TSenha, TSenhaContext } from '../../util/types';
import { toastConfig } from "../../util/toast";
import { toast } from "react-toastify";
import nProgress from "nprogress";
import { useNavigate } from "react-router-dom";
import { API } from "../../util/api";

export const SenhaContext = createContext({} as TSenhaContext);

export const SenhaProvider = ({ children }: TChildren) => {

    const [tokenState, setTokenState] = useState<string | null>(null);

    const navigate = useNavigate()

    const enviarEmail = async (data: TEmail) => {
        let email = data.email
        try {
            nProgress.start();
            await API.post(`/auth/recuperar-senha?email=${email}`)
            toast.success("E-mail enviado com sucesso! Verifique sua caixa de entrada.", toastConfig);
            navigate('/')
            console.log(email)
        } catch (error) {
            toast.error('Houve algum erro, tente novamente mais tarde.', toastConfig)
        } finally {
            nProgress.done();
        }

    }

    const enviarSenha = async (senha: TSenha) => {

        try {
            nProgress.start();
            console.log(senha, tokenState)
            await API.put(`/auth/atualizar-senha/${tokenState}`, senha)
            toast.success("Senha alterada com sucesso!", toastConfig);
            navigate('/')

        } catch (error) {
            toast.error('Houve algum erro, tente novamente mais tarde.', toastConfig)
        } finally {
            nProgress.done();
        }

    }
    return (
        <SenhaContext.Provider value={{ enviarEmail, enviarSenha, tokenState, setTokenState }}>
            {children}
        </SenhaContext.Provider>
    )
}