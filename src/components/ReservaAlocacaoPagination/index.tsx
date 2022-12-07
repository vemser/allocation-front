import { useContext, useMemo, useEffect } from "react";
import {  useSearchParams } from "react-router-dom";
import { ReservaAlocacaoContext } from "../../context/ReservaAlocacaoContext";
import { Pagination, PaginationLink } from "../Pagination/Pagination.styled";

export const ReservaAlocacaoPagination = () => {
    const { totalPages, getReservasAlocacoes } = useContext(ReservaAlocacaoContext);
    const [searchParam] = useSearchParams();
    const pageNumber = (searchParam.get("pagina") || "1");

    const pages = useMemo(() => {
        const pageList: number[] = [];

        for (let i = 1; i <= totalPages; i++) {
            pageList.push(i)
        }
        return pageList;
    }, [totalPages]);

    useEffect(() => {
        getReservasAlocacoes(Number(pageNumber));
    }, [pageNumber]);

    return (
        <Pagination>
            {pages.map((item) => (
                <PaginationLink key={item} to={`/reservas-alocacoes?pagina=${item}`}>
                    {item}
                </PaginationLink>
            ))}
        </Pagination>
    )
}