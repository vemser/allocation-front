import { TCargo, TPrograma, TUser, TVaga } from "./types";

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

export interface IUserLogged extends TUser {
    cargos: TCargo[],
    image?: string
}

export interface IUser extends TUser{
 cargo: TCargo
}