import React, { useEffect, useState } from 'react'
import { Button,} from '@material-ui/core'
import '../../foodCard.css'
import {PhotoDialog} from '../dialog/photoDialog'


export const PhotoButton: React.FC<{result, index}> = ({result, index}) => {

    const [openPhoto, setOpenPhoto] = useState<boolean>(false);
    const [photoReference, setPhotoReference] = useState<string>("");

    const setPhotoId = (result, index) => {
        result.photos !== undefined ? setPhotoReference(result.photos[0].photo_reference) : setPhotoReference("")
        setOpenPhoto(true)
    }

    return (
      <div>
      <Button data-testid="photo button"
              className="foodCard-body"
              key={result.photos !== undefined ? result.photos[0].photo_reference: null}
              variant="outlined"
              color="primary"
              onClick={() => setPhotoId(result,index)}>
              View Photo
      </Button>
      {openPhoto && <PhotoDialog open={openPhoto} onClose={() => setOpenPhoto(false)} photo_reference={photoReference}/> }
      </div>
    )
}
