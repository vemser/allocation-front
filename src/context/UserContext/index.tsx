import { TChildren, TUser, TUserContext } from '../../util/types';
import { createContext, useState } from "react";
import { IUserForm } from '../../util/interface';


export const UserContext = createContext({} as TUserContext);

export const UserProvider = ({ children }: TChildren) => {

    const [users, setUsers]  = useState<TUser[]>([]); //lista para armazenar os usuários cadastrados

    const createUser = async (user: IUserForm) => {
        console.log(user);
    }
    return (
        <UserContext.Provider value={{ users, createUser }}>
          {children}
        </UserContext.Provider>
      )

}

