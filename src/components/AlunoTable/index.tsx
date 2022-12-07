import { useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { TableHeadSC } from "./AlunoTable.styled";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog, TOptionsConfirmDialog } from "../ConfirmDialog";
import { AlunoContext } from "../../context/AlunoContext";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlunoPagination } from "../AlunoPagination";

export default function AlunoTable() {
  const navigate = useNavigate();

  const { alunos, deleteAluno } =
    useContext(AlunoContext);

  const [confirmDialog, setConfirmDialog] = useState<TOptionsConfirmDialog>({
    isOpen: false,
    title: "",
    onConfirm: () => { },
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeadSC>
          <TableRow>
            <TableCell align="center" sx={{ color: "white" }}>
              Código
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Nome
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              E-mail
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Área
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Ação
            </TableCell>
          </TableRow>
        </TableHeadSC>
        <TableBody>
          {alunos.length === 0 || alunos === undefined ? (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" colSpan={5}>Nenhum registro encontrado.
              </TableCell>
            </TableRow>
          ) : (
            alunos.map((aluno: any) => (
              <TableRow
                key={aluno.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {" "}
                  {aluno.idAluno}{" "}
                </TableCell>
                <TableCell align="center">{aluno.nome}</TableCell>
                <TableCell align="center">{aluno.email}</TableCell>
                <TableCell align="center">{aluno.area}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() =>
                      navigate("/cadastro-alunos", { state: aluno })
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={(event) => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Confirma a exclusão desse registro?",
                        onConfirm: () => {
                          setConfirmDialog({
                            ...confirmDialog,
                            isOpen: false,
                          });
                          deleteAluno(aluno.idAluno);
                        },
                      });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <AlunoPagination />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </TableContainer>
  );
}