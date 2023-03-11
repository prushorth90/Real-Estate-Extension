import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render } from "@testing-library/react";
import { PhotoDialog } from '../photoDialog'
import { MockedPhoto } from '../../../../../../../mocks/nearby/photos/mockPhoto'

global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>


let mockedFoodPhoto = null
beforeEach(() => {
    mockedFoodPhoto = new MockedPhoto()
})

afterEach(() => {
    mockedFoodPhoto = null
})

describe("for when the dialog renders", () => {
    
    it("should render result dialog success", async () => {
        mockedFoodPhoto.mockGoodPhotoAPI(mockFetch)
        await act(async () => {render(<PhotoDialog isPhotoOpen={true} onClose={jest.fn()} photo_reference={"fake photo reference"} />)})
        const foodPhoto = await screen.findByTestId("photo ready")

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()
    });
    
    it("should render dialog in document even if error ", async () => {
        mockedFoodPhoto.mockBadInvalidPhotoAPI(mockFetch)

        await act(async () => { render(<PhotoDialog isPhotoOpen={true} onClose={jest.fn()} photo_reference={undefined} />) })

        const foodPhoto = await screen.findByTestId("photo error") as HTMLDivElement

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()
        expect(foodPhoto.innerHTML).toBe("Error. Our API request has failed ")

    });

    it("should render dialog in document even if empty ", async () => {
        mockedFoodPhoto.mockBadEmptyPhotoAPI(mockFetch)

        await act(async () => { render(<PhotoDialog isPhotoOpen={true} onClose={jest.fn()} photo_reference={""} />) })

        const foodPhoto = await screen.findByTestId("photo none")

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()
        expect(foodPhoto.innerHTML).toBe(" No Photo ")

    });
    
    it("should not render dialog in document as open false", async () => {
        mockedFoodPhoto.mockGoodPhotoAPI(mockFetch)

        await act(async () => { render(<PhotoDialog isPhotoOpen={false} onClose={jest.fn()} photo_reference={""} />) })

        const foodPhoto = await screen.queryByTestId("photo none")

        expect(foodPhoto).not.toBeInTheDocument()

    });

    it("should not render dialog in document as open false with bad empty photo api", async () => {
        mockedFoodPhoto.mockBadEmptyPhotoAPI(mockFetch)

        await act(async () => { render(<PhotoDialog isPhotoOpen={false} onClose={jest.fn()} photo_reference={""} />) })

        const foodPhoto = await screen.queryByTestId("photo none")

        expect(foodPhoto).not.toBeInTheDocument()

    });

    it("should not render dialog in document as open false with bad invalid photo api", async () => {
        mockedFoodPhoto.mockBadInvalidPhotoAPI(mockFetch)

        await act(async () => { render(<PhotoDialog isPhotoOpen={false} onClose={jest.fn()} photo_reference={""} />) })

        const foodPhoto = await screen.queryByTestId("photo none")

        expect(foodPhoto).not.toBeInTheDocument()

    });
});





