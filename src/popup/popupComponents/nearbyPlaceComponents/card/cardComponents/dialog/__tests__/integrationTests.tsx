import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent  } from "@testing-library/react";
import App from '../../../../../../popup'
import { MockedTab } from '../../../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../../../mocks/address/mockAddress'
import { MockedPlaces } from '../../../../../../../mocks/nearby/places/mockPlaces'
import { MockedPhoto } from '../../../../../../../mocks/nearby/photos/mockPhoto'
global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

let mockedTab = null
let mockedAddress = null
let mockedFoodPlaces = null
let mockedFoodPhoto = null
beforeEach(() => {
    mockedTab = new MockedTab()
    mockedAddress = new MockedAddress()
    mockedFoodPlaces = new MockedPlaces()
    mockedFoodPhoto = new MockedPhoto()
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
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPhoto.mockGoodPhotoAPI(mockFetch)

        const photoButton = screen.getByTestId("photo button") as HTMLButtonElement

        await act(async () => { fireEvent.click(photoButton) });
        const foodPhoto = screen.getByTestId("photo ready") as HTMLImageElement
        //https://stackoverflow.com/questions/59572341/fireevent-keydown-not-working-as-expected-on-my-jest-react-testing-library-tes
        fireEvent.keyDown(screen.getByTestId("photo ready"), {
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
        const foodPhoto = screen.getByTestId("photo none") as HTMLImageElement
        //https://stackoverflow.com/questions/59572341/fireevent-keydown-not-working-as-expected-on-my-jest-react-testing-library-tes
        fireEvent.keyDown(screen.getByTestId("photo none"), {
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
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPhoto.mockBadInvalidPhotoAPI(mockFetch)

        const photoButton = screen.getByTestId("photo button") as HTMLButtonElement

        await act(async () => { fireEvent.click(photoButton) });
        const foodPhoto = screen.getByTestId("photo error") as HTMLImageElement
        //https://stackoverflow.com/questions/59572341/fireevent-keydown-not-working-as-expected-on-my-jest-react-testing-library-tes
        fireEvent.keyDown(screen.getByTestId("photo error"), {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            charCode: 27
        });
        expect(foodPhoto).not.toBeInTheDocument()
        expect(foodPhoto).not.toBeVisible()
    });

});