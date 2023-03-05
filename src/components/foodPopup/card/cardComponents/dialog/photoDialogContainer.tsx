import React from 'react'

import Dialog  from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';

export const PhotoDialogContainer: React.FC<{
  children: React.ReactNode
  handleClose
  open

}> = ({ children, handleClose,open }) => {

  const useStyles = makeStyles({
    paper: {
      border: "solid 1px gray"
    }
  })
  const classes = useStyles();

  return (
    <Dialog onClose={handleClose}
       fullWidth={true}
       aria-labelledby="simple-dialog-title"
       open={open}
       hideBackdrop={true}
       PaperProps={{
         elevation: 0,
         className: classes.paper
       }}>
      {children}
   </Dialog>
  )
}
