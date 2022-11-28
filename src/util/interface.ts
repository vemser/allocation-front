import { TPrograma, TUser, TVaga } from "./types";

export interface IUserForm extends TUser {
    cargo: string
}

export interface ISpanProps {
    texto: string,
    className: string
}

export interface IVagaForm extends TVaga {
    quantidadeAlocados: number,
}

export interface IProgramaForm extends TPrograma {

}

