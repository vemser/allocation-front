import { TSpanProps } from "./types";



const verificaForcaSenha = (senha: string): string => {

    let numeros = /([0-9])/;
    let alfabeto = /([a-zA-Z])/;
    let chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
    if (!senha || senha.length < 8) {
        return "Sua senha deve conter no minímo 8 caracteres.";

    }
    if ((senha.match(numeros) && !senha.match(alfabeto) && !senha.match(chEspeciais)) ||
        (senha.match(numeros) && senha.match(alfabeto) && !senha.match(chEspeciais))) {
        return "Força de senha fraca. Insira caracteres especiais e letras.";

    }

    if (senha.match(numeros) && senha.match(alfabeto) && senha.match(chEspeciais)) {
        return "Força de senha excelente.";

    } else {
        return "Força de senha média. Insira caracteres especiais.";

    }
}


export default verificaForcaSenha;