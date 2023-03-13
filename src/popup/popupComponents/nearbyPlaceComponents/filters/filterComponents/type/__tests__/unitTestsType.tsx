import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import {screen, render, fireEvent, within,act  } from "@testing-library/react";
import { TypeFilter } from '../typeFilter'
import { TopicContext } from '../../../../../../popup'
import { APIContext } from '../../../filters'
import { NearbyPlaceAPIInput } from '../../../../../../../api/nearbyPlaces/nearbyPlaceAPIInput'
import { MockedTab } from '../../../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../../../mocks/address/mockAddress'
import { MockedPlaces } from '../../../../../../../mocks/nearby/places/mockPlaces'
import App from '../../../../../../popup'
import { FoodType } from '../types/foodType'

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
describe("Components Render", () => {

    it("should render type Filter ", () => {
        render(<APIContext.Provider value={[new NearbyPlaceAPIInput("Bakery", "Bakery")]}> <TypeFilter options={Object.values(FoodType)}/></APIContext.Provider>)
        const type = screen.getByTestId("Type") as HTMLSelectElement

        expect(type).toBeInTheDocument()
        expect(type).toBeVisible()
        const typeIn = screen.getByTestId("Input Type") as HTMLInputElement
        expect(typeIn.value).toBe("Bakery")

    });

});

describe("change value of type filter", () => {

    it("should change from bakery to cafe ", async() => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })
        const apiMenuSelect = screen.getByTestId("api_menu_input") as HTMLSelectElement
        await act(async () => { fireEvent.change(apiMenuSelect, { target: { value: "Nearby Places" } }) });
        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockSecondGoodAPI(mockFetch)


        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => {fireEvent.click(options.getByText(/Cafe/i));});
        expect(type.value).toBe("Cafe")
    });

    it("should change from bakery to cafe to bakery", async() => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })
        const apiMenuSelect = screen.getByTestId("api_menu_input") as HTMLSelectElement
        await act(async () => { fireEvent.change(apiMenuSelect, { target: { value: "Nearby Places" } }) });
        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockSecondGoodAPI(mockFetch)


        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Cafe/i)); });
        expect(type.value).toBe("Cafe")

        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
        const options2 = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options2.getByText(/Bakery/i)); });
        expect(type.value).toBe("Bakery")
    });
});