import React, { useEffect, useState, useContext, createContext } from 'react'
import { CoordContext } from '../../../../../../popup'
import { Button, TextField } from '@material-ui/core'
import { Coordinate } from '../../../../../../../api/address/addressIndex'

export const CoordFilter: React.FC<{  }> = () => {

    const [coord, setCoord] = useContext(CoordContext)

    const [latitude, setLatitude] = useState<number>(null);
    const [longitude, setLongitude] = useState<number>(null);
    function submitCoord() {
        let newCoord: Coordinate = {
            results: [{
                geometry: {
                    location: {
                        lat: latitude,
                        lng: longitude
                    }
                }
            }]
        }

        setCoord(newCoord)
    }
    return (
        <div>
            <TextField

                required={true}
                id="standard-number1"
                label="Latitude"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ min: -90, max: 90, "data-testid": "latitude_input" }}
                onChange={(event) => { event.target.value === "" ? setLatitude(null) : setLatitude(Number(event.target.value)) }}
            />
            <br />
            <br />
            <TextField
                required={true}
                id="standard-number2"
                label="Longitude"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ min: -180, max: 180, "data-testid": "longitude_input" }}
                onChange={(event) => { event.target.value === "" ? setLongitude(null) : setLongitude(Number(event.target.value)) }}
            />
            <br />
            {((latitude !== null && latitude >= -90 && latitude <= 90) && (longitude !== null && longitude >= -180 && longitude <= 180)) && <Button data-testid="submit_coord" onClick={submitCoord} variant="contained" color="primary">Submit</Button>}
        </div>
    )


}