import { render, screen, fireEvent } from "@testing-library/react";
import { HeaderLogin } from "../components/HeaderLogin";

describe('Tela Pagina de Erro', () => {
   
    test('Encontrar o logo da DBC ', () => {
        render(<HeaderLogin/>)
        const image = screen.getByAltText('logo');
        expect(image).toHaveAttribute('src');
        

    })
})