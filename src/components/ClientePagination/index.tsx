import { useContext, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ClienteContext } from "../../context/ClienteContext";
import { Pagination, PaginationLink } from "../Pagination/Pagination.styled";



export const ClientePagination = () => {
    const { totalPages, getClientes } = useContext(ClienteContext);
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
        getClientes(Number(pageNumber));
    }, [pageNumber]);

    return (
        <Pagination>
            {pages.map((item) => (
                <PaginationLink key={item} to={`/clientes?pagina=${item}`}>{item}</PaginationLink>
            ))}
        </Pagination>
    )
}