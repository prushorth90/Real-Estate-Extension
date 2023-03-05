import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent } from "@testing-library/react";
import {TopicMenu} from "../../topicMenu";
import {App} from "../../../../popup";
import { TopicContext } from '../../../../popup/popup'
import { MockedTab } from '../../../../mocks/tab/mockTab';
import {MockedAddress} from '../../../../mocks/address/mockAddress'
import { MockedFoodPlaces} from '../../../../mocks/food/places/mockFoodPlaces'

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

describe("when the topic menu has been rendered", () => {
    it("should show and check the values of topic menu", () => {
        render((<TopicContext.Provider value={["Topics", jest.fn()]}> <TopicMenu /></TopicContext.Provider>))
        
        const topicMenuSelect = screen.getByTestId("topic_menu_select")

        expect(topicMenuSelect).toBeVisible()
        expect(topicMenuSelect).toBeInTheDocument()

        const topicMenuInput = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        expect(topicMenuInput.value).toBe("Topics")
        
    });

    it("should show the topic select menu", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })
        const topicMenuInput = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        expect(topicMenuInput).toBeInTheDocument()
        expect(topicMenuInput.value).toBe("Topics")

    });

    it("should show and check the values the topic select menu even if bad empty address", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await act(async () => { render(<App />) })
        const topicMenuInput = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        expect(topicMenuInput).toBeInTheDocument()
        expect(topicMenuInput.value).toBe("Topics")

    });

    it("should show and check the values the topic select menu even if bad invalid address", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await act(async () => { render(<App />) })
        const topicMenuInput = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        expect(topicMenuInput).toBeInTheDocument()
        expect(topicMenuInput.value).toBe("Topics")

    });

});


describe("for the topic menu change event topic to food", () => {
    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodFoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        expect(topicMenuSelect.value).toBe("Food");
    });

    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadEmptyFoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        expect(topicMenuSelect.value).toBe("Food");
    });

    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadInvalidFoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        expect(topicMenuSelect.value).toBe("Food");
    });

    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        expect(topicMenuSelect.value).toBe("Food");
    });
    
    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        expect(topicMenuSelect.value).toBe("Food");
    });


  
});

describe("for the topic menu change event food to topic", () => {

    it("should be able to go from food back to topic", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)


        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodFoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });

        expect(topicMenuSelect.value).toBe("Topics");
    });
    

    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadEmptyFoodAPI(mockFetch)


        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });

        expect(topicMenuSelect.value).toBe("Topics");
    });

    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadInvalidFoodAPI(mockFetch)


        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });

        expect(topicMenuSelect.value).toBe("Topics");
    });

    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });

        expect(topicMenuSelect.value).toBe("Topics");
    });

    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });

        expect(topicMenuSelect.value).toBe("Topics");
    });


});

