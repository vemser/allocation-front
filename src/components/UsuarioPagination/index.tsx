import { useContext, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Pagination, PaginationLink } from "../Pagination/Pagination.styled";

export const UsuarioPagination = () => {
    const { totalPages, getUsers } = useContext(UserContext);
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
        getUsers(Number(pageNumber));
    }, [pageNumber]);

    return (
        <Pagination>
            {pages.map((item) => (
                <PaginationLink key={item} to={`/usuarios?pagina=${item}`}>{item}</PaginationLink>
            ))}
        </Pagination>
    )
}