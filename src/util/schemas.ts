import * as yup from "yup";

const regexEmail = /^[A-Za-z0-9._%+-]+@dbccompany.com.br$/

export const userFormSchema = yup.object().shape({
    nomeCompleto: yup.string().required("Por favor, digite seu nome").min(2, "O nome precisa ter no mínimo 2 caracteres"),
    email: yup.string().required("Por favor, digite seu e-mail").email("Por favor, digite um e-mail válido").matches(regexEmail, "Só aceitamos email @dbccompany.com.br"),
    senha: yup.string().required("Por favor, digite sua senha").min(8, "A senha precisa ter no mínimo 8 caracteres"),
    senhaIgual: yup.string().required("Por favor, confirme sua senha").min(8, "A senha precisa ter no mínimo 8 caracteres")
});

export const userEditFormSchema = yup.object().shape({
    nomeCompleto: yup.string().required("Por favor, digite seu nome").min(2, "O nome precisa ter no mínimo 2 caracteres"),
    email: yup.string().required("Por favor, digite seu e-mail").email("Por favor, digite um e-mail válido").matches(regexEmail, "Só aceitamos email @dbccompany.com.br"),
});

export const userLoginSchema = yup.object().shape({
    email: yup.string().required("Por favor Digite seu e-mail").email('Por favor, digite um email válido').matches(regexEmail, "Só aceitamos email @dbccompany.com.br"),
    senha: yup.string().required("Por favor Digite sua senha").min(6, "A senha deve ter no mínimo 6 dígitos")
})

export const userPesquisaSchema = yup.object().shape({
    // pesquisar: yup.string().required("Por favor Digite um e-mail").email('Por favor, digite um email válido')
})

export const alunoSchema = yup.object().shape({
    nome: yup.string().required("Por favor, digite o nome completo").min(2, "O nome precisa ter no mínimo 2 caracteres"),
    telefone: yup.string().required("Por favor, digite um número de telefone").min(10, "Por favor, digite um número de telefone válido"),
    cidade: yup.string().required("Por favor, informe a cidade"),
    estado: yup.string().required("Por favor, informe o estado"),
    email: yup.string().required("Por favor Digite seu e-mail").email('Por favor, digite um email válido').matches(regexEmail, "Só aceitamos email @dbccompany.com.br"),
    idPrograma: yup.string().required("Por favor, informe o id do programa"),
    // tipoVaga: yup.string().required(),
    // tecnologias: yup.string().required("Por favor Digite uma Linguagem"),
    edicao: yup.string(),
    descricao: yup.string().required("Por favor, preencha esse campo"),
})

export const vagaFormSchema = yup.object().shape({
    idCliente: yup.string().required("Por favor, informe o id do cliente"),
    idPrograma: yup.number().required("Por favor, informe o id do programa"),
    nome: yup.string().required("Por favor, digite a vaga "),
    quantidade: yup.number().typeError("Por favor, informe a quantidade").min(1, "Por favor, a quantidade de vagas deve ser maior que zero").required("Por favor, informe a quantidade"),
    dataAbertura: yup.date().typeError("Por favor, informe a data de abertura").required("Por favor, informe a data de abertura"),
    situacao: yup.string().required("Por favor, informe a situação"),

});

export const programaFormSchema = yup.object().shape({
    nome: yup.string().required("Por favor, informe o nome do programa"),
    situacao: yup.string().required("Por favor, informe a situação"),
    dataTermino: yup.string().required("Por favor, informe a data de término"),
});

export const reservaAlocacaoFormSchema = yup.object().shape({
    idAluno: yup.string().required("Por favor, informe o aluno"),
    idVaga: yup.string().required("Por favor, informe a vaga"),
    descricao: yup.string().required("Por favor, informe a descrição"),
    dataReserva: yup.string().required("Por favor, informe a data de reserva"),
    situacaoAllocation: yup.string().required("Por favor, informe a situação"),
    idAvaliacao: yup.string().when('situacaoAllocation', {
        is: (situacaoAllocation: string) => situacaoAllocation && situacaoAllocation === "ALOCADO",
        then: yup.string().required("Por favor, informe a avaliação")
    })
});

export const avaliacaoSimplesFormSchema = yup.object().shape({
    emailAluno: yup.string().required("Por favor, informe o email do aluno").matches(regexEmail, "Só aceitamos email @dbccompany.com.br"),
    idVaga: yup.string().required("Por favor, informe a vaga"),
    descricao: yup.string().required("Por favor, informe a descrição"),
    nota: yup.number().typeError("Por favor, informe a nota").required("Por favor, informe a nota").min(1, "A nota precisa ser maior que 0").max(10, "A nota precisa ser menor que 10"),
    dataAvaliacao: yup.string().required("Por favor, informe a data da avaliação"),

});

export const avaliacaoEntrevistaFormSchema = yup.object().shape({
    emailAluno: yup.string().required("Por favor, informe o email do aluno").matches(regexEmail, "Só aceitamos email @dbccompany.com.br"),
    idVaga: yup.string().required("Por favor, informe a vaga"),
    descricao: yup.string().required("Por favor, informe a descrição"),
    nota: yup.number().typeError("Por favor, informe a nota").required("Por favor, informe a nota").min(1, "A nota precisa ser maior que 0").max(10, "A nota precisa ser menor que 10"),
    dataAvaliacao: yup.string().required("Por favor, informe a data da avaliação"),
    // dataEntrevistaGp: yup.string().required("Por favor, informe a data da entrevista GP"),
    // dataEntrevistaCliente: yup.string().required("Por favor, informe a data da entrevista cliente"),
    // dataResposta: yup.string().required("Por favor, informe a data de resposta"),
});

export const clienteFormSchema = yup.object().shape({
    nome: yup.string().required("Por favor, informe o nome do cliente"),
    email: yup.string().required("Por favor, informe o e-mail do cliente").matches(regexEmail, "Só aceitamos email @dbccompany.com.br"),
    telefone: yup.string().required("Por favor, informe um telefone"),
    situacao: yup.string().required("Por favor, informe a situação")
});


export const TrocarSenhaFormSchema = yup.object().shape({
    senha: yup.string().required("Por favor, digite sua senha").min(8, "A senha precisa ter no mínimo 8 caracteres"),
    senhaIgual: yup.string().required("Por favor, confirme sua senha").min(8, "A senha precisa ter no mínimo 8 caracteres")
});

export const PerfilFormSchema = yup.object().shape({
    nomeCompleto: yup.string().required("Por favor, digite seu nome").min(2, "O nome precisa ter no mínimo 2 caracteres"),
    senha: yup.string().required("Por favor, digite sua senha").min(8, "A senha precisa ter no mínimo 8 caracteres"),
    senhaIgual: yup.string().required("Por favor, confirme sua senha").min(8, "A senha precisa ter no mínimo 8 caracteres")
});