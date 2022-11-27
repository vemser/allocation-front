import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React from 'react';

interface Props {
  open: boolean,
  setOpen(open:boolean): void,
  onConfirm(): void
}

const ConfirmDialog: React.FC<Props> = (props) => {
 
    const handleClose = () => {
      props.setOpen(false);
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                Confirmação
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Confirma a exclusão desse registro?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)}>Cancelar</Button>
                <Button onClick={() => {
                    props.onConfirm();
                    props.setOpen(false);
                }} autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
