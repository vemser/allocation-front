import { IUserLogged } from "./interface";
import { TCargo } from "./types";

export const podeAcessarTela = (roles:TCargo[], userLogged:IUserLogged) => {
    let encontrouCargo = false;
    roles.forEach((cargo) => {
        if (userLogged && userLogged?.cargos.filter((item) => {
            return item.nome === cargo.nome;
        }).length > 0) {
            encontrouCargo = true;
        }
    });
    return encontrouCargo;
}