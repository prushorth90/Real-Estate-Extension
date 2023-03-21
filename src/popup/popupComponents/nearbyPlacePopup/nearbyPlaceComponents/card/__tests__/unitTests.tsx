import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { screen, render  } from "@testing-library/react";
import { CardStateContext } from '../../../nearbyPlacePopup'
import { NearbyPlaceCard } from '../nearbyPlaceCard';
import {ResultState} from '../cardComponents/result/resultState'
import * as testHelper from '../../../../../../testHelpers/testHelpers'

describe("for when the card is rendered", () => {

    it("should show the card in doc", async () => {
        render((<CardStateContext.Provider value={[ResultState.None, jest.fn()]}> <NearbyPlaceCard /></CardStateContext.Provider>))
        await testHelper.checkNoneCard()
    });

    it("should show the card in doc", async () => {
        render((<CardStateContext.Provider value={[ResultState.Loading, jest.fn()]}> <NearbyPlaceCard /></CardStateContext.Provider>))
        await testHelper.checkLoadingCard()
    });

    it("should show the card in doc", async () => {
        render((<CardStateContext.Provider value={[ResultState.Error, jest.fn()]}> <NearbyPlaceCard /></CardStateContext.Provider>))
        await testHelper.checkErrorCard()
    });

    it("should show the card in doc", async () => {
        render((<CardStateContext.Provider value={[ResultState.House_Not_Found, jest.fn()]}> <NearbyPlaceCard /></CardStateContext.Provider>))
        await testHelper.checkHouseNotFoundCard()
    });
});

