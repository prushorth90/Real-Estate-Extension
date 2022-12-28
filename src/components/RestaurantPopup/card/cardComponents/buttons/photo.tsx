import React, { useEffect, useState } from 'react'
import { Button,} from '@material-ui/core'
import '../../restaurantCard.css'
import {PhotoDialog} from '../dialog/photoDialog'


export const PhotoButton: React.FC<{result, index}> = ({result, index}) => {
//setOpenPhoto={setOpenPhoto} setPhotoId={setPhotoId} openPhoto={openPhoto} photoReference={photoReference}
    const [openPhoto, setOpenPhoto] = useState<boolean>(false);
    const [photoReference, setPhotoReference] = useState<string>("");
    const [currIndex, setCurrIndex ] = useState<number>(-1);

    const setPhotoId = (result, index) => {
        if (result.photos !== undefined) {
          setPhotoReference(result.photos[0].photo_reference)
        } else if (result.photos === undefined) {
          setPhotoReference("")
        }
        setOpenPhoto(true)
        setCurrIndex(index)
    }

    return (
      <div>
      <Button className="restaurantCard-body"
              key={result.photos !== undefined ? result.photos[0].photo_reference: null}
              variant="outlined"
              color="primary"
              onClick={() => setPhotoId(result,index)}>
              View Photo
      </Button>
      {index == currIndex ? <PhotoDialog open={openPhoto} onClose={() => setOpenPhoto(false)} photo_reference={photoReference}/> : null}
      </div>
    )
}
