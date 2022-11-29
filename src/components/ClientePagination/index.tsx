import { useContext, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ClienteContext } from "../../context/ClienteContext";



export const ClientePagination = () => {
    const { totalPages, getClientes } = useContext(ClienteContext);
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
        getClientes(Number(pageNumber));
    }, [pageNumber]);

    return (
        <div >
            {pages.map((item) => (
                <Link key={item} to={`/clientes?pagina=${item}`}>{item}</Link>
            ))}
        </div>
    )
}