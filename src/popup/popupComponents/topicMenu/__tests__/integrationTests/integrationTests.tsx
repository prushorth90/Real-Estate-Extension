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

describe("tests when change from topic to food", () => {

    it("should be able to see ready result cards", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const card = await screen.findByTestId("result card") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()


        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake Bakery ")

        const totalUserRating = await screen.findByTestId("result user rating total") as HTMLParagraphElement
        expect(totalUserRating.innerHTML).toBe("Total User Ratings: 90 ")

        const priceLevel = await screen.findByTestId("result price level") as HTMLParagraphElement
        expect(priceLevel.innerHTML).toBe("Price Level: 3")

        const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
        expect(vicinity.innerHTML).toBe(" Vicinity: Fake address ")

        const photoButton = await screen.findByTestId("photo button") as HTMLButtonElement
        expect(photoButton).toBeInTheDocument()
        

    });

    it("should be able to see none card as empty food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadEmptyAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")


    });

    it("should be able to see error cards as bad food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadInvalidAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("Error. Our API request has failed")


    });

    it("should be able to see none card as bad address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")




    });

    it("should be able to see none card as invalid address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")



    });

});


describe("tests when change from food to topic", () => {

    it("should be able to see no cards", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        const card = await screen.findByTestId("result card") as HTMLDivElement
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });


        expect(topicMenuSelect.value).toBe("Topics");
        expect(card).not.toBeInTheDocument()

    });

    it("should be able to see no cards if empty food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadEmptyAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });


        expect(topicMenuSelect.value).toBe("Topics");
        expect(card).not.toBeInTheDocument()

    });

    it("should be able to see no cards if bad food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadInvalidAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });


        expect(topicMenuSelect.value).toBe("Topics");
        expect(card).not.toBeInTheDocument()


    });

    it("should be able to see no cards if bad address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });

        expect(topicMenuSelect.value).toBe("Topics");
        expect(card).not.toBeInTheDocument()




    });

    it("should be able to see no cards if invalid address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });

        expect(topicMenuSelect.value).toBe("Topics");
        expect(card).not.toBeInTheDocument()



    });

});