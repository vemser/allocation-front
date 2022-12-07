import { useContext, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AlunoContext } from "../../context/AlunoContext";
import { Pagination, PaginationLink } from "../Pagination/Pagination.styled";

export const AlunoDashPagination = () => {
    const { totalPages, getAlunos } = useContext(AlunoContext);
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
        getAlunos(Number(pageNumber));
    }, [pageNumber]);

    return (
        <Pagination>
            {pages.map((item) => (
                <PaginationLink key={item} to={`/dash-alunos?pagina=${item}`}>{item}</PaginationLink>
            ))}
        </Pagination>
    )
}