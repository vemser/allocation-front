import React from "react";
import { IUserForm } from "./interface";

export type TChildren = {
    children: React.ReactNode;
}

export type TUser = {
    nome : string,
    email : string,
    senha : string,
    foto : string,
    tipoUsuario: string 
}

export type TUserContext = {
    users: TUser[],
    createUser : (user: IUserForm) => Promise<void>
}