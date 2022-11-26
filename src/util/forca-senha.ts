import { TSpanProps } from "./types";



const verificaForcaSenha = (senha: string): TSpanProps => {
    let validacao: TSpanProps = {
        texto: "",
        className : ""
    };

    let numeros = /([0-9])/;
    let alfabeto = /([a-zA-Z])/;
    let chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
    if (!senha || senha.length < 8) {
        validacao.className = "error";
        validacao.texto = "Sua senha deve conter no minímo 8 caracteres.";
        return validacao;
    }
    if ((senha.match(numeros) && !senha.match(alfabeto) && !senha.match(chEspeciais)) ||
        (senha.match(numeros) && senha.match(alfabeto) && !senha.match(chEspeciais))) {
        validacao.className = "error";
        validacao.texto = "Força de senha fraca. Insira caracteres especiais e letras.";
        return validacao;
    }

    if (senha.match(numeros) && senha.match(alfabeto) && senha.match(chEspeciais)) {
        validacao.className = "success";
        validacao.texto = "Força de senha excelente.";
        return validacao;
    } else {
        validacao.className = "warning";
        validacao.texto = "Força de senha média. Insira caracteres especiais.";
        return validacao;
    }
}


export default verificaForcaSenha;