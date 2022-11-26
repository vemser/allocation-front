import { TUser } from "./types";

export interface IUserForm extends TUser{
    confirmarSenha : string
}

export interface ISpanProps {
    texto: string,
    className: string
}