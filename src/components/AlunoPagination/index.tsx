import { useContext, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AlunoContext } from "../../context/AlunoContext";

export const AlunoPagination = () => {
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
        <div >
            {pages.map((item) => (
                <Link key={item} to={`/alunos?pagina=${item}`}>{item}</Link>
            ))}
        </div>
    )
}