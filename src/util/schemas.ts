import * as yup from 'yup';

export const userFormSchema = yup.object().shape({
    email: yup.string().required("Por favor Digite seu e-mail").email('Por favor, digite um email válido'),
    senha: yup.string().required("Por favor Digite sua senha").min(6, "A senha deve ter no mínimo 6 dígitos")
})