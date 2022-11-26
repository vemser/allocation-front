import * as yup from "yup";

export const userFormSchema = yup.object().shape({
    nomeCompleto: yup.string().required("Por favor, digite seu nome").min(2, "O nome precisa ter no mínimo 2 caracteres"),
    email: yup.string().required("Por favor, digite seu e-mail").email("Por favor, digite um e-mail válido"),
    senha: yup.string().required("Por favor, digite sua senha").min(8, "A senha precisa ter no mínimo 8 caracteres"),
    confirmarSenha: yup.string().required("Por favor, digite sua senha").min(8, "A senha precisa ter no mínimo 8 caracteres"),
    tipoUsuario: yup.string().required("Por favor, selecione o tipo de usuário")
});

export const userLoginSchema = yup.object().shape({
    email: yup.string().required("Por favor Digite seu e-mail").email('Por favor, digite um email válido'),
    senha: yup.string().required("Por favor Digite sua senha").min(6, "A senha deve ter no mínimo 6 dígitos")
})

export const vagaFormSchema = yup.object().shape({
    idCliente: yup.string().required("Por favor, informe o cliente"),
    idVaga: yup.string().required("Por favor, informe a vaga"),
    idPrograma: yup.string().required("Por favor, informe o programa"),
    nome: yup.string().required("Por favor, digite a vaga "),
    quantidade: yup.number().typeError("Por favor, informe a quantidade").min(1, "Por favor, a quantidade de vagas deve ser maior que zero").required("Por favor, informe a quantidade"),
    dataAbertura: yup.date().typeError("Por favor, informe a data de abertura").required("Por favor, informe a data de abertura"),
    situacao: yup.string().required("Por favor, informe a situação"),
});


export const programaFormSchema = yup.object().shape({
    nome: yup.string().required("Por favor, informe o nome do programa"),
    descricao: yup.string().required("Por favor, informe a descrição vaga"),
    data: yup.string().required("Por favor, informe uma data"),
    situacao: yup.string().required("Por favor, informe a situação")
});
