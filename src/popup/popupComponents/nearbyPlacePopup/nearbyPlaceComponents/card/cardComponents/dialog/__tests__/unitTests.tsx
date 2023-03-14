import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render } from "@testing-library/react";
import { PhotoDialog } from '../photoDialog'
import { MockedPhoto } from '../../../../../../../../mocks/nearby/photos/mockPhoto'
import * as testHelper from '../../../../../../../../testHelpers/testHelpers'

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
        await testHelper.checkReadyPhoto()
    });
    
    it("should render dialog in document even if error ", async () => {
        mockedFoodPhoto.mockBadInvalidPhotoAPI(mockFetch)
        await act(async () => { render(<PhotoDialog isPhotoOpen={true} onClose={jest.fn()} photo_reference={undefined} />) })
        await testHelper.checkErrorPhoto()
    });

    it("should render dialog in document even if empty ", async () => {
        mockedFoodPhoto.mockBadEmptyPhotoAPI(mockFetch)
        await act(async () => { render(<PhotoDialog isPhotoOpen={true} onClose={jest.fn()} photo_reference={""} />) })
        await testHelper.checkNonePhoto()
    });
    
    it("should not render dialog in document as open false", async () => {
        mockedFoodPhoto.mockGoodPhotoAPI(mockFetch)
        await act(async () => { render(<PhotoDialog isPhotoOpen={false} onClose={jest.fn()} photo_reference={""} />) })
        await checkNoPhoto()

    });

    it("should not render dialog in document as open false with bad empty photo api", async () => {
        mockedFoodPhoto.mockBadEmptyPhotoAPI(mockFetch)
        await act(async () => { render(<PhotoDialog isPhotoOpen={false} onClose={jest.fn()} photo_reference={""} />) })
        await checkNoPhoto()

    });

    it("should not render dialog in document as open false with bad invalid photo api", async () => {
        mockedFoodPhoto.mockBadInvalidPhotoAPI(mockFetch)
        await act(async () => { render(<PhotoDialog isPhotoOpen={false} onClose={jest.fn()} photo_reference={""} />) })
        await checkNoPhoto()

    });
});

async function checkNoPhoto(){
    const foodPhoto = await screen.queryByTestId("photo none")
    expect(foodPhoto).not.toBeInTheDocument()
}



