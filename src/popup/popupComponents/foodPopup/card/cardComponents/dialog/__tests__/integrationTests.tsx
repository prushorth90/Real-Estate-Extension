import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent  } from "@testing-library/react";
import App from '../../../../../../popup'
import { MockedTab } from '../../../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../../../mocks/address/mockAddress'
import { MockedFoodPlaces } from '../../../../../../../mocks/food/places/mockFoodPlaces'
import { MockedFoodPhoto } from '../../../../../../../mocks/food/photos/mockFoodPhoto'
global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

let mockedTab = null
let mockedAddress = null
let mockedFoodPlaces = null
let mockedFoodPhoto = null
beforeEach(() => {
    mockedTab = new MockedTab()
    mockedAddress = new MockedAddress()
    mockedFoodPlaces = new MockedFoodPlaces()
    mockedFoodPhoto = new MockedFoodPhoto()
})

afterEach(() => {
    mockedTab = null
    mockedAddress = null
    mockedFoodPlaces = null
    mockedFoodPhoto = null
})


describe("close photo dialog tests", () => {

    it("should close the photo dialog", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodFoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPhoto.mockGoodPhotoAPI(mockFetch)

        const photoButton = screen.getByTestId("photo button") as HTMLButtonElement

        await act(async () => { fireEvent.click(photoButton) });
        const foodPhoto = screen.getByTestId("food photo") as HTMLImageElement
        //https://stackoverflow.com/questions/59572341/fireevent-keydown-not-working-as-expected-on-my-jest-react-testing-library-tes
        fireEvent.keyDown(screen.getByTestId("food photo"), {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            charCode: 27
        });
        expect(foodPhoto).not.toBeInTheDocument()
        expect(foodPhoto).not.toBeVisible()
    });

    it("should close the photo dialog even if no photo dialog", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPhoto.mockBadEmptyPhotoAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const photoButton = screen.getByTestId("photo button") as HTMLButtonElement

        await act(async () => { fireEvent.click(photoButton) });
        const foodPhoto = screen.getByTestId("food photo none") as HTMLImageElement
        //https://stackoverflow.com/questions/59572341/fireevent-keydown-not-working-as-expected-on-my-jest-react-testing-library-tes
        fireEvent.keyDown(screen.getByTestId("food photo none"), {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            charCode: 27
        });
        expect(foodPhoto).not.toBeInTheDocument()
        expect(foodPhoto).not.toBeVisible()
    });

    it("should close the photo dialog even if error photo dialog", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodFoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPhoto.mockBadInvalidPhotoAPI(mockFetch)

        const photoButton = screen.getByTestId("photo button") as HTMLButtonElement

        await act(async () => { fireEvent.click(photoButton) });
        const foodPhoto = screen.getByTestId("food photo error") as HTMLImageElement
        //https://stackoverflow.com/questions/59572341/fireevent-keydown-not-working-as-expected-on-my-jest-react-testing-library-tes
        fireEvent.keyDown(screen.getByTestId("food photo error"), {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            charCode: 27
        });
        expect(foodPhoto).not.toBeInTheDocument()
        expect(foodPhoto).not.toBeVisible()
    });

});
