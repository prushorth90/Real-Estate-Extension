import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import FoodPopup from "../foodPopup";
import { TopicContext } from '../../../popup/popup'
import { App } from "../../../popup";
import { chrome } from 'jest-chrome'
import { MockedTab } from '../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../mocks/address/mockAddress'
import { MockedFoodPlaces } from '../../../mocks/food/places/mockFoodPlaces'

global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

let mockedTab = null
let mockedAddress = null
let mockedFoodPlaces = null

beforeEach(() => {
    mockedTab = new MockedTab()
    mockedAddress = new MockedAddress()
    mockedFoodPlaces = new MockedFoodPlaces()

})

afterEach(() => {
    mockedTab = null
    mockedAddress = null
    mockedFoodPlaces = null
})

describe("when the main component food-popup has been rendered", () => {

    
    it("should show the food popup", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodFoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodPopup = screen.getByTestId("food-popup")

        expect(foodPopup).toBeInTheDocument()

    });

    it("should show the food popup even if empty food api response", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadEmptyFoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodPopup = screen.getByTestId("food-popup")

        expect(foodPopup).toBeInTheDocument()

    });

    it("should show the food popup even if empty food api invalid", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadInvalidFoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodPopup = screen.getByTestId("food-popup")

        expect(foodPopup).toBeInTheDocument()

    });

    it("should show the food popup even if bad empty address", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodPopup = screen.getByTestId("food-popup")

        expect(foodPopup).toBeInTheDocument()


    });

    it("should show the food popup even if bad invalid address", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodPopup = screen.getByTestId("food-popup")

        expect(foodPopup).toBeInTheDocument()

    });
});

