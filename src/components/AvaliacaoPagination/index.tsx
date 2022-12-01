import { useContext, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AvaliacaoContext } from "../../context/AvaliacaoContext";
import { ClienteContext } from "../../context/ClienteContext";
import { Pagination, PaginationLink } from "../Pagination/Pagination.styled";



export const AvaliacaoPagination = () => {
    const { totalPages, getAvaliacoes } = useContext(AvaliacaoContext);
    const [searchParam] = useSearchParams();
    const pageNumber = (searchParam.get("page") || "1");

    const pages = useMemo(() => {
        const pageList: number[] = [];

        for (let i = 1; i <= totalPages; i++) {
            pageList.push(i)
        }
        return pageList;
    }, [totalPages]);

    useEffect(() => {
        getAvaliacoes(Number(pageNumber));
    }, [pageNumber]);

    return (
        <Pagination>
            {pages.map((item) => (
                <PaginationLink key={item} to={`/avaliacoes?pagina=${item}`}>{item}</PaginationLink>
            ))}
        </Pagination>
    )
}