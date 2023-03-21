import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { render, screen} from "@testing-library/react";
import * as testHelper from '../../../../../../../../testHelpers/testHelpers'
import { HouseNotFound } from '../houseNotFound';
import { CoordContext } from '../../../../../../../popup';
import { Coordinate } from '../../../../../../../../api/address/coordinate';

let newCoord: Coordinate = {
    results: [{
        geometry: {
            location: {
                lat: null,
                lng: -68.8
            }
        }
    }]
}

describe("for when the card is rendered", () => {

    it("should show the card in doc", async () => {
        render((<CoordContext.Provider value={[newCoord, jest.fn()]}> <HouseNotFound /></CoordContext.Provider>))
        expect(screen.getByTestId("latitude_input")).toBeInTheDocument()
        expect(screen.getByTestId("longitude_input")).toBeInTheDocument()
    });

});

