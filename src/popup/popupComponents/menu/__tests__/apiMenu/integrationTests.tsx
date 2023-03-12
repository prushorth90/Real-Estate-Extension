import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent } from "@testing-library/react";
import { App } from "../../../..";
import { MockedTab } from '../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../mocks/address/mockAddress'
import { MockedPlaces } from '../../../../../mocks/nearby/places/mockPlaces'


global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

let mockedTab = null
let mockedAddress = null
let mockedFoodPlaces = null

beforeEach(() => {
    mockedTab = new MockedTab()
    mockedAddress = new MockedAddress()
    mockedFoodPlaces = new MockedPlaces()

})

afterEach(() => {
    mockedTab = null
    mockedAddress = null
    mockedFoodPlaces = null
})

describe("tests when change from topic to food", () => {

    it("should be able to see ready result cards", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })
        const apiMenuSelect = screen.getByTestId("api_menu_input") as HTMLSelectElement
        await act(async () => { fireEvent.change(apiMenuSelect, { target: { value: "Nearby Places" } }) });
      
        expect(apiMenuSelect.value).toBe("Nearby Places")
        
    });

    it("should be able api menu", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await act(async () => { render(<App />) })
        const apiMenuSelect = screen.getByTestId("api_menu_input") as HTMLSelectElement
        await act(async () => { fireEvent.change(apiMenuSelect, { target: { value: "Nearby Places" } }) });

        expect(apiMenuSelect.value).toBe("Nearby Places")

    });

    it("should be able to see none card as invalid address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await act(async () => { render(<App />) })
        const apiMenuSelect = screen.getByTestId("api_menu_input") as HTMLSelectElement
        await act(async () => { fireEvent.change(apiMenuSelect, { target: { value: "Nearby Places" } }) });

        expect(apiMenuSelect.value).toBe("Nearby Places")

    });

});

