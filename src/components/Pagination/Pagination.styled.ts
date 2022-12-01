import { Link } from "react-router-dom";
import styled from "styled-components";

export const Pagination = styled.div`
    width: 100%;
    margin: 15px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 0 10px;
`;

export const PaginationLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 27.25px;
    background-color: var(--azul-dbc);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 3px;
    transition: 0.3s;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        opacity: 0.8;
        transition: 0.3s;
    }
`;

