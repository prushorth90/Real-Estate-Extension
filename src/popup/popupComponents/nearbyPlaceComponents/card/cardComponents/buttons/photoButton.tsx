import React, { useState } from 'react'
import { Button,} from '@material-ui/core'
import '../../nearbyPlaceCard.css'
import {PhotoDialog} from '../dialog/photoDialog'


export const PhotoButton: React.FC<{result, index}> = ({result, index}) => {

    const [isPhotoOpen, setIsPhotoOpen] = useState<boolean>(false);
    const [photoReference, setPhotoReference] = useState<string>("");

    const setPhotoId = (result, index) => {
        result.photos !== undefined ? setPhotoReference(result.photos[0].photo_reference) : setPhotoReference("")
        setIsPhotoOpen(true)
    }

    return (
      <div>
      <Button data-testid="photo button"
              className="card-body"
              key={result.photos !== undefined ? result.photos[0].photo_reference: null}
              variant="outlined"
              color="primary"
              onClick={() => setPhotoId(result,index)}>
              View Photo
      </Button>
      {isPhotoOpen && <PhotoDialog isPhotoOpen={isPhotoOpen} onClose={() => setIsPhotoOpen(false)} photo_reference={photoReference}/> }
      </div>
    )
}
