import React from "react";
import { IUserForm } from "./interface";

export type TChildren = {
    children: React.ReactNode;
}

export type TUser = {
    idUsuario: number,
    nomeCompleto : string,
    email : string,
    senha : string,
    tipoUsuario: string,
    foto: string
}

export type TUserContext = {
    users: TUser[],
    createUser : (data: IUserForm) => Promise<void>
}
export type TSpanProps = {
    texto?: string,
    className: string
}

export type TAuth = {
    email: string,
    senha: string
}

export type TAuthContext = {
    handleUserLogin: (user: TAuth) => Promise<void>,
    handleUserLogout: () => void,
    token: string | null
}

export type TAlunoContext = {
    handleCreateAluno: (aluno: TAluno) => Promise<void>
}

export type TAluno = {
    nome: string,
    telefone: string,
    cidade: string,
    estado: string,
    email: string,
    tipoVaga: string,
    edicao: string,
    descricao: string
}