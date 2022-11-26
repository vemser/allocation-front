import { TUser, TVaga } from "./types";

export interface IUserForm extends TUser {
    confirmarSenha: string
}

export interface ISpanProps {
    texto: string,
    className: string
}

export interface IVagaForm extends TVaga {
    quantidadeAlocados: number,
}