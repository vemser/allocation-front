import React from "react";
import { IProgramaForm, IUserForm, IVagaForm } from "./interface";

export type TChildren = {
    children: React.ReactNode;
}

export type TUser = {
    idUsuario: number,
    nomeCompleto: string,
    email: string,
    senha: string,
    tipoUsuario: string,
    foto: string
}

export type TUserContext = {
    users: TUser[],
    createUser: (data: IUserForm) => Promise<void>
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
    token: string | null
}

export type TVaga = {
    idVaga: number,
    idCliente: number,
    idPrograma: number,
    nome: string,
    quantidade: number,
    dataAbertura: Date,
    dataFechamento: Date,
    dataCriacao: Date,
    situacao: string,
    observacoes: string

}

export type TVagaContext = {
    vagas: TVaga[],
    createVaga: (data: IVagaForm) => Promise<void>
}

export type TPrograma = {
    nome: string,
    descricao: string,
    data: Date,
    dataCriacao: Date,
    situacao: string

}

export type TProgramaContext = {
    programas: TPrograma[],
    createPrograma: (data: IProgramaForm) => Promise<void>
}


