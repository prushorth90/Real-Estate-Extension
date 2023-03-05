import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import { PhotoDialog } from '../photoDialog'
import App, { TopicContext } from '../../../../../../popup/popup'
//import { APIContext } from '../../../filters'
//import { APIInput } from '../../../apiInput'
import UserEvent from '@testing-library/user-event'
import { chrome } from 'jest-chrome'
import { MockedFoodPhoto } from '../../../../../../mocks/food/photos/mockFoodPhoto'

global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>


let mockedFoodPhoto = null
beforeEach(() => {
    mockedFoodPhoto = new MockedFoodPhoto()
})

afterEach(() => {
    mockedFoodPhoto = null
})


describe("for when the dialog renders", () => {
    
    it("should render result dialog success", async () => {
        mockedFoodPhoto.mockGoodPhotoAPI(mockFetch)
        await act(async () => {render(<PhotoDialog isPhotoOpen={true} onClose={jest.fn()} photo_reference={"fake photo reference"} />)})
        const foodPhoto = await screen.findByTestId("food photo")

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()
    });
    

    it("should render dialog in document even if error ", async () => {
        mockedFoodPhoto.mockBadInvalidPhotoAPI(mockFetch)

        await act(async () => { render(<PhotoDialog isPhotoOpen={true} onClose={jest.fn()} photo_reference={undefined} />) })

        const foodPhoto = await screen.findByTestId("food photo error") as HTMLDivElement

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()
        expect(foodPhoto.innerHTML).toBe("Error. Our API request has failed ")



    });

    it("should render dialog in document even if empty ", async () => {
        mockedFoodPhoto.mockBadEmptyPhotoAPI(mockFetch)

        await act(async () => { render(<PhotoDialog isPhotoOpen={true} onClose={jest.fn()} photo_reference={""} />) })

        const foodPhoto = await screen.findByTestId("food photo none")

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()
        expect(foodPhoto.innerHTML).toBe(" No Photo ")

    });
    
    it("should not render dialog in document as open false", async () => {
        mockedFoodPhoto.mockGoodPhotoAPI(mockFetch)

        await act(async () => { render(<PhotoDialog isPhotoOpen={false} onClose={jest.fn()} photo_reference={""} />) })

        const foodPhoto = await screen.queryByTestId("food photo none")

        expect(foodPhoto).not.toBeInTheDocument()

    });

    it("should not render dialog in document as open false with bad empty photo api", async () => {
        mockedFoodPhoto.mockBadEmptyPhotoAPI(mockFetch)

        await act(async () => { render(<PhotoDialog isPhotoOpen={false} onClose={jest.fn()} photo_reference={""} />) })

        const foodPhoto = await screen.queryByTestId("food photo none")

        expect(foodPhoto).not.toBeInTheDocument()

    });

    it("should not render dialog in document as open false with bad invalid photo api", async () => {
        mockedFoodPhoto.mockBadInvalidPhotoAPI(mockFetch)

        await act(async () => { render(<PhotoDialog isPhotoOpen={false} onClose={jest.fn()} photo_reference={""} />) })

        const foodPhoto = await screen.queryByTestId("food photo none")

        expect(foodPhoto).not.toBeInTheDocument()

    });


    
  

});





