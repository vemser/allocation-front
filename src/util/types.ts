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
    setRadioValue: React.Dispatch<any>,
    radioValue: string,
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
    totalPages: number,
    vagas: TVaga[],
    createVaga: (data: IVagaForm) => Promise<void>,
    updateVaga: (data: IVagaForm, idVaga: number) => Promise<void>,
    deleteVaga: (id: number) => Promise<void>,
    getVagas: (page: number) => Promise<void>,
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
    codigo: number,
    idAluno: number,
    idVaga: number,
    avaliacao: string,
    descricao: string,
    dataReserva: Date,
    dataAlocacao: Date,
    dataCancelamento: Date,
    dataFinalizacao: Date,
    situacao: string
}

export type TReservaAlocacaoContext = {
    reservasAlocacoes: TReservaAlocacao[],
    createReservaAlocacao: (data: TReservaAlocacao) => Promise<void>
}

export type TAvaliacao = {
    codigo: number,
    idAluno: number,
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
