import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PaginaErro } from "../pages/PaginaErro";
describe('Tela Pagina de Erro', () => {
   
    test('Encontrar mensagem de página não encontrada ', () => {
        render(<BrowserRouter><PaginaErro /></BrowserRouter>)
        expect(screen.getByText('A página que você procura não foi encontrada!')).toBeInTheDocument();

    });
    test('Encontrar link de voltar para página inicial ', () => {
        render(<BrowserRouter><PaginaErro /></BrowserRouter>)
        expect(screen.getByText('Voltar para página inicial')).toBeInTheDocument();

    });
})