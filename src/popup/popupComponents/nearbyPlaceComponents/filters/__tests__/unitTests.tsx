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

describe("when the main component filter has been rendered", () => {


    it("should show the food filter", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodFilter = screen.getByTestId("filter")

        expect(foodFilter).toBeInTheDocument()

    });

    it("should show the food filter even if empty food api response", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadEmptyAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodFilter = screen.getByTestId("filter")

        expect(foodFilter).toBeInTheDocument()

    });

    it("should show the food filter even if empty food api invalid", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadInvalidAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodFilter = screen.getByTestId("filter")

        expect(foodFilter).toBeInTheDocument()

    });

    it("should show the food filter even if bad empty address", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodFilter = screen.getByTestId("filter")

        expect(foodFilter).toBeInTheDocument()


    });

    it("should show the food filter even if bad invalid address", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodFilter = screen.getByTestId("filter")

        expect(foodFilter).toBeInTheDocument()

    });
});