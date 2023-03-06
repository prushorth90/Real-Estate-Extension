import React, {useState } from 'react'
import {Typography,} from '@material-ui/core'
import {PhotoAPI} from '../../../../../utils/api/photo/photoIndex'
import {PhotoDialogState} from './photoDialogState'
import {PhotoDialogPartial} from './photoDialogPartial'

export const PhotoDialog: React.FC<{isPhotoOpen: boolean, onClose: () => void,photo_reference}> = ({isPhotoOpen,onClose, photo_reference}) => {

    const [photo, setPhoto] = useState<string>("")
    const [photoState, setPhotoState] = useState<PhotoDialogState>(PhotoDialogState.Start)
    let photoAPI = new PhotoAPI()
    const handleClose = () => {
      onClose();
      setPhoto("")
      setPhotoState(PhotoDialogState.Start)
    }

    const getPhoto = () => {
      if (photo_reference != "" ) {
        setPhotoState(PhotoDialogState.Loading)
        photoAPI.fetchData(photo_reference)
          .then((data) => {
            if (data.url == undefined) throw new Error('e')
            setPhoto(data.url)
            setPhotoState(PhotoDialogState.Ready)
          }).catch((err) => setPhotoState(PhotoDialogState.Error))
      } else {
        setPhotoState(PhotoDialogState.None)
      }
    }

    return (
      <PhotoDialogPartial handleClose={handleClose} open={isPhotoOpen} >
          {photoState === PhotoDialogState.Start && <div> {getPhoto()} </div>}
          {photoState === PhotoDialogState.Loading && <Typography>{PhotoDialogState.Loading}  </Typography>}
          {photoState === PhotoDialogState.Error && <Typography data-testid="food photo error">{PhotoDialogState.Error} </Typography>}
          {photoState === PhotoDialogState.None && <Typography data-testid="food photo none"> {PhotoDialogState.None} </Typography>}
          {photoState === PhotoDialogState.Ready && <img data-testid="food photo" src={photo}/> }
      </PhotoDialogPartial>
    )

}