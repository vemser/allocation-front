import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React from 'react';

export interface TOptionsConfirmDialog {
    isOpen: boolean,
    title: string,
    onConfirm(): void
}

interface Props {
  confirmDialog: TOptionsConfirmDialog,
  setConfirmDialog(options:TOptionsConfirmDialog): void
}

export const ConfirmDialog: React.FC<Props> = ({confirmDialog, setConfirmDialog}:Props) => {
 

    return (
        <Dialog
            open={confirmDialog.isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                Confirmação
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {confirmDialog.title}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false})}>Cancelar</Button>
                <Button color='success' onClick={confirmDialog.onConfirm} autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
