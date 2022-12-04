import styled from 'styled-components';
import { Link } from 'react-router-dom'


export const LinkSC = styled(Link)`

    text-decoration: none;
    color: var(--azul-dbc);

   
`;

export const LinkMenu = styled(Link)`
 
 @media (max-width: 900px) {
        display: none;
      }
`