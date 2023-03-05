import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import FoodPopup from "../../foodPopup";
import { TopicContext } from '../../../../popup/popup'
import { App } from "../../../../popup";
import { chrome } from 'jest-chrome'
import { MockedTab } from '../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../mocks/address/mockAddress'
import { MockedFoodPlaces } from '../../../../mocks/food/places/mockFoodPlaces'


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

describe("when the main component food-filter has been rendered", () => {


    it("should show the food filter", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodFoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodFilter = screen.getByTestId("food-filter")

        expect(foodFilter).toBeInTheDocument()

    });

    it("should show the food filter even if empty food api response", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadEmptyFoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodFilter = screen.getByTestId("food-filter")

        expect(foodFilter).toBeInTheDocument()

    });

    it("should show the food filter even if empty food api invalid", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadInvalidFoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodFilter = screen.getByTestId("food-filter")

        expect(foodFilter).toBeInTheDocument()

    });

    it("should show the food filter even if bad empty address", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodFilter = screen.getByTestId("food-filter")

        expect(foodFilter).toBeInTheDocument()


    });

    it("should show the food filter even if bad invalid address", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodFilter = screen.getByTestId("food-filter")

        expect(foodFilter).toBeInTheDocument()

    });
});





// describe("for when the food filters have been rendered", () => {

//     it("should show the radius filter in doc", async () => {

//         render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

//         const radiusFilter = await screen.findByTestId("Radius") as HTMLSelectElement

//         expect(radiusFilter).toBeInTheDocument()
//         expect(radiusFilter).toBeVisible()

//     });

//     it("should show the type filter value", () => {

//         render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

//         const typeFilter = screen.getByTestId("Type") as HTMLSelectElement

//         expect(typeFilter).toBeInTheDocument()
//         expect(typeFilter).toBeVisible()


//     });

//     it("should show the Min Price Level filter value", () => {

//         render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

//         const minPriceLevel = screen.getByTestId("Min Price Level") as HTMLSelectElement

//         expect(minPriceLevel).toBeInTheDocument()
//         expect(minPriceLevel).toBeVisible()


//     });

//     it("should show the Max Price Level filter value", () => {

//         render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

//         const maxPriceLevel = screen.getByTestId("Max Price Level") as HTMLSelectElement

//         expect(maxPriceLevel).toBeInTheDocument()
//         expect(maxPriceLevel).toBeVisible()

//     });



// });
// describe("for when the filters have been rendered", () => {

//     it("should show the radius filter in doc", () => {

//         render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

//         const radiusFilter = screen.getByTestId("Radius") as HTMLSelectElement

//         expect(radiusFilter).toBeInTheDocument()
//         expect(radiusFilter).toBeVisible()


//     });

//     it("should show the type filter value", () => {

//         render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

//         const typeFilter = screen.getByTestId("Type") as HTMLSelectElement

//         expect(typeFilter).toBeInTheDocument()
//         expect(typeFilter).toBeVisible()


//     });

//     it("should show the Min Price Level filter value", () => {

//         render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

//         const minPriceLevel = screen.getByTestId("Min Price Level") as HTMLSelectElement

//         expect(minPriceLevel).toBeInTheDocument()
//         expect(minPriceLevel).toBeVisible()


//     });

//     it("should show the Max Price Level filter value", () => {

//         render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

//         const maxPriceLevel = screen.getByTestId("Max Price Level") as HTMLSelectElement

//         expect(maxPriceLevel).toBeInTheDocument()
//         expect(maxPriceLevel).toBeVisible()

//     });



// });


