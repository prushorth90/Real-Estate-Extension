import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import { CuisineFilter } from '../cuisineFilter'
import App, { TopicContext } from '../../../../../../popup/popup'
import { APIContext } from '../../../filters'
import { APIInput } from '../../../apiInput'
import { InputLabel } from '@material-ui/core';
import { chrome } from 'jest-chrome'
import { MockedTab } from '../../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../../mocks/address/mockAddress'
import { MockedFoodPlaces } from '../../../../../../mocks/food/places/mockFoodPlaces'

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


describe("change value of cuisine filter to italian", () => {


        it("should be able to see card when change cuisine to italian", async () => {
            mockedTab.mockGoodTabAPI(mockFetch)
            mockedAddress.mockGoodAddressAPI(mockFetch)

            await act(async () => { render(<App />) })

            const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
            mockedFoodPlaces.mockGoodFoodAPI(mockFetch)

            await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
            mockedFoodPlaces.mockSecondGoodFoodAPI(mockFetch)

            const type = screen.getByTestId("Input Type") as HTMLSelectElement
            await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
            const options = within(screen.getByRole('listbox'));
            await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
            expect(type.value).toBe("Restaurant")

            const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
            await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
            const cuisineOptions = within(screen.getByRole('listbox'));
            await act(async () => { fireEvent.click(cuisineOptions.getByText(/Italian/i)) });
            expect(cuisine.value).toBe("Italian")

            const card = await screen.findByTestId("result card") as HTMLDivElement
            expect(card).toBeVisible()
            expect(card).toBeInTheDocument()

            const name = await screen.findByTestId("result name") as HTMLParagraphElement
            expect(name.innerHTML).toBe(" Fake Bakery 2 ")

            const totalUserRating = await screen.findByTestId("result user rating total") as HTMLParagraphElement
            expect(totalUserRating.innerHTML).toBe("Total User Ratings: 10 ")

            const priceLevel = await screen.findByTestId("result price level") as HTMLParagraphElement
            expect(priceLevel.innerHTML).toBe("Price Level: 4")

            const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
            expect(vicinity.innerHTML).toBe(" Vicinity: Fake address 2 ")

            const photoButton = await screen.findByTestId("photo button") as HTMLButtonElement
            expect(photoButton).toBeInTheDocument()

        });

        it("should be able to see none card when change filter of cuisine as bad empty address", async () => {
            mockedTab.mockGoodTabAPI(mockFetch)
            mockedAddress.mockGoodAddressAPI(mockFetch)


            await act(async () => { render(<App />) })

            const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
            mockedFoodPlaces.mockBadEmptyFoodAPI(mockFetch)

            await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
            mockedFoodPlaces.mockBadEmptyFoodAPI(mockFetch)

            const type = screen.getByTestId("Input Type") as HTMLSelectElement
            await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
            const options = within(screen.getByRole('listbox'));
            await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
            expect(type.value).toBe("Restaurant")

            const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
            await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
            const cuisineOptions = within(screen.getByRole('listbox'));
            await act(async () => { fireEvent.click(cuisineOptions.getByText(/Italian/i)) });
            expect(cuisine.value).toBe("Italian")

            const card = await screen.findByTestId("result card other") as HTMLDivElement
            expect(card).toBeVisible()
            expect(card).toBeInTheDocument()
            expect(card.innerHTML).toBe("No data to show")


        });

        it("should be able to see error card when change cuisine as bad invalid food", async () => {
            mockedTab.mockGoodTabAPI(mockFetch)
            mockedAddress.mockGoodAddressAPI(mockFetch)


            await act(async () => { render(<App />) })

            const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
            mockedFoodPlaces.mockBadInvalidFoodAPI(mockFetch)

            await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
            mockedFoodPlaces.mockBadInvalidFoodAPI(mockFetch)

            const type = screen.getByTestId("Input Type") as HTMLSelectElement
            await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
            const options = within(screen.getByRole('listbox'));
            await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
            expect(type.value).toBe("Restaurant")

            const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
            await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
            const cuisineOptions = within(screen.getByRole('listbox'));
            await act(async () => { fireEvent.click(cuisineOptions.getByText(/Italian/i)) });
            expect(cuisine.value).toBe("Italian")

            const card = await screen.findByTestId("result card other") as HTMLDivElement
            expect(card).toBeVisible()
            expect(card).toBeInTheDocument()
            expect(card.innerHTML).toBe("Error. Our API request has failed")


        });

        it("should be able to see none card when change cuisine as bad empty address", async () => {
            mockedTab.mockGoodTabAPI(mockFetch)
            mockedAddress.mockBadEmptyAddressAPI(mockFetch)


            await act(async () => { render(<App />) })

            const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

            await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

            const type = screen.getByTestId("Input Type") as HTMLSelectElement
            await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
            const options = within(screen.getByRole('listbox'));
            await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
            expect(type.value).toBe("Restaurant")

            const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
            await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
            const cuisineOptions = within(screen.getByRole('listbox'));
            await act(async () => { fireEvent.click(cuisineOptions.getByText(/Italian/i)) });
            expect(cuisine.value).toBe("Italian")

            const card = await screen.findByTestId("result card other") as HTMLDivElement
            expect(card).toBeVisible()
            expect(card).toBeInTheDocument()
            expect(card.innerHTML).toBe("No data to show")


        });

        it("should be able to see none card when change cuisine   as bad invalid address", async () => {
            mockedTab.mockGoodTabAPI(mockFetch)
            mockedAddress.mockBadInvalidAddressAPI(mockFetch)


            await act(async () => { render(<App />) })

            const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

            await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

            const type = screen.getByTestId("Input Type") as HTMLSelectElement
            await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
            const options = within(screen.getByRole('listbox'));
            await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
            expect(type.value).toBe("Restaurant")

            const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
            await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
            const cuisineOptions = within(screen.getByRole('listbox'));
            await act(async () => { fireEvent.click(cuisineOptions.getByText(/Italian/i)) });
            expect(cuisine.value).toBe("Italian")

            const card = await screen.findByTestId("result card other") as HTMLDivElement
            expect(card).toBeVisible()
            expect(card).toBeInTheDocument()
            expect(card.innerHTML).toBe("No data to show")


        });

});