import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material'

export default function ConfirmDialog({ open, title='Confirmar', message, onCancel, onConfirm, confirmColor='error' }){
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent><Typography>{message}</Typography></DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary" variant="contained">Cancelar</Button>
        <Button onClick={onConfirm} color={confirmColor} variant="contained">Confirmar</Button>
      </DialogActions>
    </Dialog>
  )
}
