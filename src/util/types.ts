import React from "react"

export type TUser = {
    email: string,
    senha: string
}

export type TAuthContext = {
    handleUserLogin: (user: TUser) => Promise<void>,
    token: string | null
}

export type TChildren = {
    children: React.ReactNode;
}