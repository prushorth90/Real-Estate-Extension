import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { screen, render, fireEvent, within ,act } from "@testing-library/react";
import FoodPopup from "../../../../../../foodPopup/foodPopup";
import { MaxPriceFilter } from '../../maxPriceFilter'
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

describe("for when the max price component renders", () => {

    it("should render Max Price Filter ", () => {
        render(<APIContext.Provider value={[new NearbyPlaceAPIInput("Bakery", "Bakery")]}> <MaxPriceFilter /></APIContext.Provider>)

        const maxPriceLevel = screen.getByTestId("Max Price Level") as HTMLSelectElement
        const maxPriceIn = screen.getByTestId("Input Max Price Level") as HTMLInputElement

        expect(maxPriceIn.value).toBe("4")
        expect(maxPriceLevel).toBeInTheDocument()
        expect(maxPriceLevel).toBeVisible()

    });

});


describe("change event for the value of filter", () => {

    it("should change from 4 to 3 ", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockSecondGoodAPI(mockFetch)


        const minPriceLevel = screen.getByTestId("Input Max Price Level") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[4]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/3/i)) });
        expect(minPriceLevel.value).toBe("3")
    });

    it("should change from 4 to 3 to 4", async() => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockSecondGoodAPI(mockFetch)


        const minPriceLevel = screen.getByTestId("Input Max Price Level") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[4]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/3/i)) });
        expect(minPriceLevel.value).toBe("3")
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[4]) });
        const options2 = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options2.getByText(/4/i)) });
        expect(minPriceLevel.value).toBe("4")
    });

});


