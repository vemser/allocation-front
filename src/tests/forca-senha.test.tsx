import verificaForcaSenha from "../util/forca-senha"


describe('Recebe uma senha', () => {
    test('Ao informar uma senha inferior a 8 caracteres, a função deve retornar que a senha deve conter no minímo 8 caracteres.', () => {
        expect(verificaForcaSenha('1#dr78')).toBe('Sua senha deve conter no minímo 8 caracteres.');
    });

    test('Ao informar uma senha sem caracteres especiais somente com numeros , a função deve retornar que a senha é fraca e solicitar caracteres especiais e letras.', () => {
        expect(verificaForcaSenha('879542148')).toBe('Força de senha fraca. Insira caracteres especiais e letras.');
    });

    test('Ao informar uma senha sem caracteres especiais somente com  letras, a função deve retornar que a senha é fraca e solicitar caracteres especiais e letras.', () => {
        expect(verificaForcaSenha('agtennhsv')).toBe('Força de senha fraca. Insira caracteres especiais e letras.');
    });

    test('Ao informar uma senha com caracteres especiais e no mínimo 8 digitos informar força de senha excelente.', () => {
        expect(verificaForcaSenha('daht148#')).toBe('Força de senha excelente.');
    });

    test('Ao informar uma senha sem caracteres especiais e no mínimo 8 digitos informar força de senha média', () => {
        expect(verificaForcaSenha('dah12324')).toBe('Força de senha média. Insira caracteres especiais.');
    });

})