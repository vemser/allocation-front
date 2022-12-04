import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const LinkSC = styled(Link)`
    text-decoration: none;
    color: var(--azul-dbc);   
`;

export const LinkMenu = styled(Link)`
    text-decoration: none;
    color: var(--azul-dbc);  
 
 @media (max-width: 900px) {
        display: none;
      }      
`
export const LinkMenuMin = styled(Link)`
    text-decoration: none;
    color: var(--azul-dbc); 
@media (min-width: 900px) {
        display: none;
      } 
`