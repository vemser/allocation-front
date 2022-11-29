import React from "react";
import { IProgramaForm, IUserForm, IUserLogged, IVagaForm } from "./interface";

export type TChildren = {
    children: React.ReactNode;
}


export type TUser = {
    idUsuario: number,
    nomeCompleto: string,
    email: string,
    senha: string,
    senhaIgual: string
   
}

export type TUserContext = {
    users: TUser[],
    totalPages: number,
    createUser: (data: TUser, cargo?: string) => Promise<void>,
    getUsers:(page:number) => Promise<void>
}
export type TSpanProps = {
    texto?: string,
    className: string
}

export type TAuth = {
    email: string,
    senha: string
}

export type TCargo ={
    idCargo? : number,
    nome: string
}


export type TAuthContext = {
    handleUserLogin: (user: TAuth) => Promise<void>,
    handleUserLogout: () => void,
    token: string | null,
    userLogged?: IUserLogged,
    isLogged : boolean,
    handleUserLogged :() => Promise<void>
}

export type TAlunoContext = {
    handleCreateAluno: (aluno: TAluno) => Promise<void>,
    setRadioValue: React.Dispatch<any>,
    radioValue: string,
    setTecnologias: React.Dispatch<React.SetStateAction<string[]>>,
    tecnologias: string[]
}

export type TAluno = {
    nome: string,
    telefone: string,
    cidade: string,
    estado: string,
    email: string,
    tipoVaga: string,
    edicao: string,
    descricao: string,
    tecnologias: string[],
    programa: string,
    emProcesso: string,
    alocado: string
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

export type TReservaAlocacao = {
    codigo : number,
    idAluno: number,
    idVaga: number,
    avaliacao: string,
    descricao : string,
    dataReserva : Date,
    dataAlocacao: Date,
    dataCancelamento: Date,
    dataFinalizacao: Date,
    situacao: string
}

export type TReservaAlocacaoContext ={
    reservasAlocacoes : TReservaAlocacao[],
    createReservaAlocacao: (data: TReservaAlocacao) => Promise<void>
}

export type TAvaliacao = {
    codigo : number,
    idAluno : number,
    idVaga: number,
    descricao: string,
    nota: number,
    tipoAvaliacao: string,
    dataAvaliacao: Date,
    dataEntrevistaGp: Date,
    dataEntrevistaCliente: Date,
    dataResposta: Date,
    dataCriacao: Date,
    situacao: string
}

export type TAvaliacaoContext = {
    avaliacoes: TAvaliacao[], 
    createAvaliacao: (data: TAvaliacao) => Promise<void>,
    updateAvaliacao: (data: TAvaliacao) => Promise<void>,
    deleteAvaliacao: (id: number) => Promise<void>,

}

export type  TCliente ={
    idCliente: number,
    nome : string,
    email : string,
    telefone: string,
    situacao: string
}

export type TClienteContext ={
    totalPages: number,
    clientes : TCliente[],
    createCliente: (data: TCliente) => Promise<void>,
    updateCliente: (data: TCliente, idCliente: number) => Promise<void>,
    deleteCliente: (idCliente: number) => Promise<void>,
    getClientes: (page:number) => Promise<void>,
    setClientes:(clientes: TCliente[])=>void
    
}