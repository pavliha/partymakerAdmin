import React from 'react'
import { func, bool } from 'prop-types'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'

const DeleteDialog = ({ onClose, onConfirm, isOpen }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Ты точно хочешь удалить это место?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="default">
          Отменить
        </Button>
        <Button onClick={onConfirm} variant="raised" color="primary" autoFocus>
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DeleteDialog.propTypes = {
  onClose: func.isRequired,
  onConfirm: func.isRequired,
  isOpen: bool.isRequired,
}

export default DeleteDialog
