import React, { useEffect, useState } from 'react'
import { Button} from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import {PhotoAPI} from '../../../utils/api/photo/photoIndex'

export const PhotoDialog: React.FC<{open: boolean, onClose: () => void,photo_reference}> = ({open,onClose, photo_reference}) => {
  const [photo, setPhoto] = useState<string>("")
  let photoAPI = new PhotoAPI()
  const handleClose = () => {
    onClose();
    setPhoto("")
  }
  const useStyles = makeStyles({
    paper: {
      border: "solid 1px gray"
    }
  })
  const classes = useStyles();

  const see = () => {
    //console.log(index)
    // let photo_reference = nearby.results[index].photos[0].photo_reference
    if (photo_reference != "") {
      console.log("999")//*20
      photoAPI.fetchData(photo_reference)
        .then((data) => {
          console.log("1000")// not reached
          console.log(data.url)
          setPhoto(data.url)
          console.log("10001")

        })
        .catch((err) => console.log(err))
      }
  }



  return (
    <Dialog onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      hideBackdrop={true}
      PaperProps={{
        elevation: 0,
        className: classes.paper
      }}>
      <DialogTitle id="simple-dialog-title">Photo</DialogTitle>
      {open == true? see() : ""}
      <img src={photo}/>
    </Dialog>
  );
}
