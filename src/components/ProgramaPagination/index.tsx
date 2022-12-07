import { useContext, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProgramaContext } from "../../context/ProgramaContext";
import { Pagination, PaginationLink } from "../Pagination/Pagination.styled";

export const ProgramaPagination = () => {
    const { totalPages, getProgramas } = useContext(ProgramaContext);
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
        getProgramas(Number(pageNumber));
    }, [pageNumber]);

    return (
        <Pagination>
            {pages.map((item) => (
                <PaginationLink key={item} to={`/programas?pagina=${item}`}>
                    {item}
                </PaginationLink>
            ))}
        </Pagination>
    )
}