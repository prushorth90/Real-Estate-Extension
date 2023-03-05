import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, within } from "@testing-library/react";
import App from '../../../../../../popup/popup'
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


describe("For when the main-component have been rendered", () => {

    it("should be able to see cuisine filter", async () => {
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
        expect(cuisine).toBeInTheDocument()
        expect(cuisine.value).toBe("Pizza")

    });  

    it("should be able to see cuisine filter even if bad empty food api response", async () => {
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
        expect(cuisine).toBeInTheDocument()
        expect(cuisine.value).toBe("Pizza")

    });  

    it("should be able to see cuisine filter even if bad invalid food api response", async () => {
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
        expect(cuisine).toBeInTheDocument()
        expect(cuisine.value).toBe("Pizza")

    });  

    it("should be able to see cuisine filter even if bad empty address api response", async () => {
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
        expect(cuisine).toBeInTheDocument()
        expect(cuisine.value).toBe("Pizza")

    });  

    it("should be able to see cuisine filter even if bad invalid address api response", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

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
        expect(cuisine).toBeInTheDocument()
        expect(cuisine.value).toBe("Pizza")

    });  

});


describe("change value of cuisine filter", () => {

    it("should be able to see changed value of cuisine filter", async () => {
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


    });

    it("should be able to see changed value of cuisine filter even if bad invalid food", async () => {
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


    });

    it("should be able to see changed value of cuisine filter even if bad empty food", async () => {
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


    });

    it("should be able to see changed value of cuisine filter even if bad empty address", async () => {
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


    });

    it("should be able to see changed value of cuisine filter even if bad invalid address", async () => {
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


    });

});