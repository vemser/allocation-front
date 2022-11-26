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
