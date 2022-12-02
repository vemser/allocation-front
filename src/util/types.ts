import React from "react";
import { IProgramaForm, IUser, IUserForm, IUserLogged, IVagaForm } from "./interface";

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
    users: IUser[],
    totalPages: number,
    createUser: (data: TUser, cargo?: string, image?: File) => Promise<void>,
    getUsers: (page: number) => Promise<void>,
    updateUser: (data: TUser, idUsuario: number, cargo: string, image?: File) => Promise<void>,
    deleteUser: (idUsuario: number) => Promise<void>,
    setUsers: (usuarios: IUser[]) => void
}

export type TSpanProps = {
    texto?: string,
    className: string
}

export type TAuth = {
    email: string,
    senha: string
}

export type TCargo = {
    idCargo?: number,
    nome: string
}


export type TAuthContext = {
    handleUserLogin: (user: TAuth) => Promise<void>,
    handleUserLogout: () => void,
    token: string | null,
    userLogged?: IUserLogged,
    isLogged: boolean,
    handleUserLogged: () => Promise<void>,
    uploadImage: (email: string, formData: FormData) => Promise<void>,
    getImageUser: (email: string) => Promise<string>
}

export type TAlunoContext = {
    handleCreateAluno: (aluno: TAluno) => Promise<void>,
    setTecnologias: React.Dispatch<React.SetStateAction<string[]>>,
    tecnologias: string[],
    updateAluno: (data: TAluno, idCliente: number) => Promise<void>
    deleteAluno: (idCliente: number) => Promise<void>,
    getAlunos: (page: number) => Promise<void>,
    alunos: TAluno[],
    totalPages: number
}

export type TAluno = {
    nome: string,
    telefone: string,
    cidade: string,
    estado: string,
    email: string,
    area: string,
    descricao: string,
    tecnologias: string[],
    programa: string,
    statusAluno: string,
    idPrograma: number
}
export type TVaga = {
    idCliente: number,
    idPrograma: number,
    nome: string,
    quantidade: number,
    quantidadeAlocados: number,
    dataAbertura: any,
    dataFechamento: Date,
    dataCriacao: string,
    situacao: string,
    observacoes: string,
    emailCliente: string
}

export type TVagaContext = {
    totalPages: number,
    vagas: TVaga[],
    createVaga: (data: IVagaForm) => Promise<void>,
    updateVaga: (data: IVagaForm, idVaga: number, dataCriacao: string) => Promise<void>
    deleteVaga: (id: number) => Promise<void>,
    getVagas: (page: number) => Promise<void>,
    getPesquisaIdVagas: (idVaga: number) => Promise<void>
}

export type TPrograma = {
    idPrograma: number,
    nome: string,
    descricao: string,
    dataTermino?: Date,
    dataCriacao?: string,
    situacao: string

}

export type TProgramaContext = {
    programas: TPrograma[],
    createPrograma: (data: IProgramaForm) => Promise<void>
    totalPages: number,
    updatePrograma: (data: IProgramaForm, idPrograma: number) => Promise<void>,
    deletePrograma: (idPrograma: number) => Promise<void>,
    getProgramas: (page: number) => Promise<void>,
    setProgramas: (programas: IProgramaForm[]) => void
}

export type TReservaAlocacao = {
    idReservaAlocacao: number,
    idAluno: number,
    idVaga: number,
    idAvaliacao: string,
    descricao: string,
    dataReserva: Date,
    dataAlocacao: Date,
    dataCancelamento: Date,
    dataFinalizacao: Date,
    statusAluno: string
}

export type TReservaAlocacaoGet ={
    idReservaAlocacao: number,
    aluno: TAluno,
    vaga: TVaga,
    avaliacaoEntity: TAvaliacao,
    descricao: string,
    dataReserva: Date,
    dataAlocacao: Date,
    dataCancelamento: Date,
    dataFinalizacao: Date,
    statusAluno: string
}

export type TReservaAlocacaoContext = {
    reservasAlocacoes: TReservaAlocacaoGet[],
    createReservaAlocacao: (data: TReservaAlocacao) => Promise<void>,
    updateReservaAlocacao: (data: TReservaAlocacao, idReservaAlocacao: number) => Promise<void>,
    deleteReservaAlocacao: (idReservaAlocacao: number) => Promise<void>,
    getReservasAlocacoes: (page: number) => Promise<void>,
    setReservasAlocacoes: (reservasAlocacoes: TReservaAlocacaoGet[]) => void,
    totalPages : number
}

export type TAvaliacao = {
    idAvaliacao: number,
    emailAluno: string,
    idVaga: number,
    descricao: string,
    nota: number,
    tipoAvaliacao: string,
    dataAvaliacao: Date,
    dataEntrevistaGp: Date,
    dataEntrevistaCliente: Date,
    dataResposta: Date,
    dataCriacao: string,
    situacao: string
}

export type TAvaliacaoContext = {
    avaliacoes: TAvaliacao[],
    createAvaliacao: (data: TAvaliacao) => Promise<void>,
    updateAvaliacao: (data: TAvaliacao, idAvaliacao: number) => Promise<void>,
    deleteAvaliacao: (idAvaliacao: number) => Promise<void>,
    getAvaliacoes: (page: number) => Promise<void>,
    setAvaliacoes: (avaliacoes: TAvaliacao[]) => void,
    totalPages : number

}

export type TCliente = {
    idCliente: number,
    nome: string,
    email: string,
    telefone: string,
    situacao: string
}

export type TClienteContext = {
    totalPages: number,
    clientes: TCliente[],
    createCliente: (data: TCliente) => Promise<void>,
    updateCliente: (data: TCliente, idCliente: number) => Promise<void>,
    deleteCliente: (idCliente: number) => Promise<void>,
    getClientes: (page: number) => Promise<void>,
    setClientes: (clientes: TCliente[]) => void

}
