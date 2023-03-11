import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { screen, render, fireEvent, within,act } from "@testing-library/react";
import FoodPopup from "../../../../../../foodPopup/foodPopup";
import { MinPriceFilter } from '../../MinPriceFilter'
import { TopicContext } from '../../../../../../../popup'
import { APIContext } from '../../../../filters'
import { NearbyPlaceAPIInput } from '../../../../../../../../api/nearbyPlaces/nearbyPlaceAPIInput'
import { MockedTab } from '../../../../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../../../../mocks/address/mockAddress'
import { MockedPlaces } from '../../../../../../../../mocks/nearby/places/mockPlaces'
import App from '../../../../../../../popup'

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

describe("for when the min price component renders", () => {

    it("should render Min  Price Filter ", () => {
        render(<APIContext.Provider value={[new NearbyPlaceAPIInput("Bakery", "Bakery")]}> <MinPriceFilter /></APIContext.Provider>)

        const minPriceLevel = screen.getByTestId("Min Price Level") as HTMLSelectElement
        const minPriceIn = screen.getByTestId("Input Min Price Level") as HTMLInputElement

        expect(minPriceIn.value).toBe("0")
        expect(minPriceLevel).toBeInTheDocument()
        expect(minPriceLevel).toBeVisible()

    });

});


describe("change event for the value of filter", () => {

    it("should be able to see update filter values of min price", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockSecondGoodAPI(mockFetch)

        const minPriceLevel = screen.getByTestId("Input Min Price Level") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/1/i)) });
        expect(minPriceLevel.value).toBe("1")
    });

    it("should be able to see update filter values of min price", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockSecondGoodAPI(mockFetch)

        const minPriceLevel = screen.getByTestId("Input Min Price Level") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/1/i)) });
        expect(minPriceLevel.value).toBe("1")
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
        const options2 = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options2.getByText(/0/i)) });
        expect(minPriceLevel.value).toBe("0")
    });

});


