import * as yup from "yup";

export const userFormSchema = yup.object().shape({
    nomeCompleto: yup.string().required("Por favor, digite seu nome").min(2, "O nome precisa ter no mínimo 2 caracteres"),
    email: yup.string().required("Por favor, digite seu e-mail").email("Por favor, digite um e-mail válido"),
    senha: yup.string().required("Por favor, digite sua senha").min(8, "A senha precisa ter no mínimo 8 caracteres"),
    confirmarSenha: yup.string().required("Por favor, confirme sua senha").min(8, "A senha precisa ter no mínimo 8 caracteres"),
    tipoUsuario: yup.string().required("Por favor, selecione o tipo de usuário")
});

export const userLoginSchema = yup.object().shape({
    email: yup.string().required("Por favor Digite seu e-mail").email('Por favor, digite um email válido'),
    senha: yup.string().required("Por favor Digite sua senha").min(6, "A senha deve ter no mínimo 6 dígitos")
})

export const alunoSchema = yup.object().shape({
    nome: yup.string().required("Por favor, digite o nome completo").min(2, "O nome precisa ter no mínimo 2 caracteres"),
    telefone: yup.string().required("Por favor, digite um número de telefone").min(11, "Por favor, digite um número de telefone válido"),
    cidade: yup.string().required("Por favor, informe a cidade"),
    estado: yup.string().required("Por favor, informe o estado"),
    email: yup.string().required("Por favor Digite seu e-mail").email('Por favor, digite um email válido'),
    // tipoVaga: yup.string().required(),
    edicao: yup.string(),
    descricao: yup.string().required("Por favor, preencha esse campo"),
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


export const reservaAlocacaoFormSchema = yup.object().shape({
    idAluno: yup.string().required("Por favor, informe o aluno"),
    idVaga: yup.string().required("Por favor, informe a vaga"),
    descricao: yup.string().required("Por favor, informe a descrição"),
    dataReserva: yup.string().required("Por favor, informe a data de reserva"),
    situacao: yup.string().required("Por favor, informe a situação"),
    avaliacao: yup.string().when('situacao', {is:(situacao: string) => situacao && situacao === "alocado", 
    then: yup.string().required("Por favor, informe a avaliação")})
});


export const avaliacaoFormSchema = yup.object().shape({
    idAluno: yup.string().required("Por favor, informe o aluno"),
    idVaga: yup.string().required("Por favor, informe a vaga"),
    descricao: yup.string().required("Por favor, informe a descrição"),
    nota: yup.number().typeError("Por favor, informe a nota").required("Por favor, informe a nota").min(1, "A nota precisa ser maior que 0").max(10, "A nota precisa ser menor que 10"),
    dataAvaliacao: yup.string().required("Por favor, informe a data da avaliação"),
    dataEntrevistaGp: yup.string().required("Por favor, informe a data da entrevista GP"),
    dataEntrevistaCliente: yup.string().required("Por favor, informe a data da entrevista cliente"),
    dataResposta: yup.string().required("Por favor, informe a data de resposta"),
    // situacao: yup.string().required("Por favor, informe a situação")
});
