import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import {  screen, render, fireEvent,within ,act } from "@testing-library/react";
import FoodPopup from "../../../../../foodPopup/foodPopup";
import { RadiusFilter } from '../radiusFilter'
import { TopicContext } from '../../../../../../popup'
import { APIContext } from '../../../filters'
import { APIInput } from '../../../../../../../api/food/apiInput'
import { MockedTab } from '../../../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../../../mocks/address/mockAddress'
import { MockedFoodPlaces } from '../../../../../../../mocks/food/places/mockFoodPlaces'
import App from '../../../../../../popup'

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

describe("Components Render", () => {

    it("should render Radius Filter ", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <RadiusFilter /></APIContext.Provider>)
        const radius = screen.getByTestId("Radius") as HTMLSelectElement

        expect(radius).toBeInTheDocument()
        expect(radius).toBeVisible()
        
        const radiusIn = screen.getByTestId("Input Radius") as HTMLInputElement

        expect(radiusIn.value).toBe("1500")
    });

});


describe("Event test change value of filter", () => {

    it("should change from 1500 to 1000 ", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodFoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockSecondGoodFoodAPI(mockFetch)

        const radius = screen.getByTestId("Input Radius") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[1]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/1000/i)) });
        expect(radius.value).toBe("1000")
      
    });

    it("should change from 1500 to 1000 to 1500", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodFoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockSecondGoodFoodAPI(mockFetch)

        const radius = screen.getByTestId("Input Radius") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[1]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/1000/i)) });
        expect(radius.value).toBe("1000")
        
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[1]) });
        const options2 = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options2.getByText(/1500/i)) });
        expect(radius.value).toBe("1500")
    });




});