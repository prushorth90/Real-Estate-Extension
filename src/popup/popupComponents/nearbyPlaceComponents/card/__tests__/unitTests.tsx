import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { screen, render  } from "@testing-library/react";
import FoodPopup from "../../../foodPopup/foodPopup";
import { CardStateContext } from '../../../../popup'
import { NearbyPlaceCard } from '../nearbyPlaceCard';
import {ResultState} from '../cardComponents/result/resultState'
describe("for when the food card is rendered", () => {

    it("should show the card in doc", () => {
        render((<CardStateContext.Provider value={[ResultState.None, jest.fn()]}> <NearbyPlaceCard /></CardStateContext.Provider>))

        const card = screen.getByTestId("result card other") 
        expect(card).toBeInTheDocument()
        expect(card).toBeVisible()

        const cardVal = screen.getByTestId("result card other") as HTMLParagraphElement
        expect(cardVal.innerHTML).toBe("No data to show")
    });
    
});

