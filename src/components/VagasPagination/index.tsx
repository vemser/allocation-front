import { useContext, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { VagaContext } from "../../context/VagaContext";
import { Pagination, PaginationLink } from "../Pagination/Pagination.styled";

export const VagasPagination = () => {
    const { totalPages, getVagas } = useContext(VagaContext);
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
        getVagas(Number(pageNumber));
    }, [pageNumber]);

    return (
        <Pagination>
            {pages.map((item) => (
                <PaginationLink key={item} to={`/vagas?pagina=${item}`}>{item}</PaginationLink>
            ))}
        </Pagination>
    )
}