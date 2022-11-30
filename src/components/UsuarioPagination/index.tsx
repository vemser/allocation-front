import { useContext, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";


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
        <div >
            {pages.map((item) => (
                <Link key={item} to={`/usuarios?pagina=${item}`}>{item}</Link>
            ))}
        </div>
    )
}