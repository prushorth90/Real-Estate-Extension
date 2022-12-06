import React, { useEffect, useState } from 'react'
import { Button, Typography,} from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import {PhotoAPI} from '../../../utils/api/photo/photoIndex'
import {PhotoDialogState} from './photoDialogState'
export const PhotoDialog: React.FC<{open: boolean, onClose: () => void,photo_reference}> = ({open,onClose, photo_reference}) => {

    const [photo, setPhoto] = useState<string>("")
    const [opened, setOpened] = useState<boolean>(false)
    const [photoState, setPhotoState] = useState<PhotoDialogState>(PhotoDialogState.Start)
    let photoAPI = new PhotoAPI()
    const handleClose = () => {
      onClose();
      setPhoto("")
      setPhotoState(PhotoDialogState.Start)
    }
    const useStyles = makeStyles({
      paper: {
        border: "solid 1px gray"
      }
    })
    const classes = useStyles();
    console.log("998")

    const see = () => {
      //console.log(index)
      // let photo_reference = nearby.results[index].photos[0].photo_reference
      if (photo_reference != "" && opened != true) {
        console.log("999")//*20
        setPhotoState(PhotoDialogState.Loading)
        photoAPI.fetchData(photo_reference)
          .then((data) => {
            console.log("1000")// not reached
            console.log(data.url)
            setOpened(true)
            setPhoto(data.url)
            setPhotoState(PhotoDialogState.Ready)
            console.log("1001")
          }).catch((err) => setPhotoState(PhotoDialogState.Error))
      }
    }

  if (photoState === PhotoDialogState.Start) {
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
        <DialogTitle id="simple-dialog-title">No Photo</DialogTitle>
        <div> {open == true? see() : ""} </div>
      </Dialog>
  )
 } else if (photoState === PhotoDialogState.Loading || photoState === PhotoDialogState.Error) {
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
        <DialogTitle id="simple-dialog-title">Photo</DialogTitle>
        <Typography> {photoState === PhotoDialogState.Loading ? PhotoDialogState.Loading : PhotoDialogState.Error} </Typography>
      </Dialog>
    )
  } else if (photoState === PhotoDialogState.Ready) {
      return (

        <Dialog onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
          hideBackdrop={true}
          PaperProps={{
            elevation: 0,
            className: classes.paper
          }}>
          <img src={photo}/>
        </Dialog>
      )
   }

}


// import React, { useEffect, useState } from 'react'
// import { Button} from '@material-ui/core'
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Dialog from '@material-ui/core/Dialog';
// import { makeStyles } from '@material-ui/core/styles';
// import {PhotoAPI} from '../../../utils/api/photo/photoIndex'
//
// export const PhotoDialog: React.FC<{open: boolean, onClose: () => void,photo_reference}> = ({open,onClose, photo_reference}) => {
//   const [photo, setPhoto] = useState<string>("")
//   const [opened, setOpened] = useState<boolean>(false)
//   let photoAPI = new PhotoAPI()
//   const handleClose = () => {
//     onClose();
//     setPhoto("")
//   }
//   const useStyles = makeStyles({
//     paper: {
//       border: "solid 1px gray"
//     }
//   })
//   const classes = useStyles();
//   console.log("998")
//   const see = () => {
//     //console.log(index)
//     // let photo_reference = nearby.results[index].photos[0].photo_reference
//     if (photo_reference != "" && opened != true) {
//       console.log("999")//*20
//       photoAPI.fetchData(photo_reference)
//         .then((data) => {
//           console.log("1000")// not reached
//           console.log(data.url)
//           setOpened(true)
//           setPhoto(data.url)
//           console.log("1001")
//
//         })
//         .catch((err) => console.log(err))
//       }
//   }
//
//
//
//   return (
//
//     <Dialog onClose={handleClose}
//       aria-labelledby="simple-dialog-title"
//       open={open}
//       hideBackdrop={true}
//       PaperProps={{
//         elevation: 0,
//         className: classes.paper
//       }}>
//       <DialogTitle id="simple-dialog-title">Photo</DialogTitle>
//       <div> {open == true? see() : ""} </div>
//       <img src={photo}/>
//     </Dialog>
//   );
// }
