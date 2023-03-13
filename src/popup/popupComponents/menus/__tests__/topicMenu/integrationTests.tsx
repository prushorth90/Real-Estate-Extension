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

        await changeToNearbyPlaces()

        await changeTopic("Food", "good valid")

        await checkReadyResultCard()
    });

    it("should be able to see none card as empty food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await changeToNearbyPlaces()

        await changeTopic("Food", "bad empty")

        await checkNoneCard()
    });

    it("should be able to see error cards as bad food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await changeToNearbyPlaces()

        await changeTopic("Food", "bad invalid")

        await checkErrorCard()
    });

    it("should be able to see none card as bad address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await changeToNearbyPlaces()

        await changeTopic("Food","")

        await checkNoneCard()
    });

    it("should be able to see none card as invalid address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await changeToNearbyPlaces()

        await changeTopic("Food", "")

        await checkNoneCard()
    });

});

describe("tests when change from food to topic", () => {

    it("should be able to see no cards", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await changeToNearbyPlaces()

        await changeTopic("Food", "good valid")

        const card = await screen.findByTestId("result card") as HTMLDivElement

        await changeTopic("Topics", "")

        expect(card).not.toBeInTheDocument()

    });

    it("should be able to see no cards if empty food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await changeToNearbyPlaces()

        await changeTopic("Food", "bad empty")

        const card = await screen.findByTestId("result card other") as HTMLDivElement

        await changeTopic("Topics", "")
        expect(card).not.toBeInTheDocument()

    });

    it("should be able to see no cards if bad food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await changeToNearbyPlaces()

        await changeTopic("Food", "bad invalid")

        const card = await screen.findByTestId("result card other") as HTMLDivElement

        await changeTopic("Topics", "")
        expect(card).not.toBeInTheDocument()

    });

    it("should be able to see no cards if bad address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await changeToNearbyPlaces()

        await changeTopic("Food", "")

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        await changeTopic("Topics", "")

        expect(card).not.toBeInTheDocument()
    });

    it("should be able to see no cards if invalid address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await changeToNearbyPlaces()

        await changeTopic("Food", "")

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        await changeTopic("Topics", "")

        expect(card).not.toBeInTheDocument()
    });

});

async function changeToNearbyPlaces(){
    await act(async () => { render(<App />) })
    const apiMenuSelect = screen.getByTestId("api_menu_input") as HTMLSelectElement
    await act(async () => { fireEvent.change(apiMenuSelect, { target: { value: "Nearby Places" } }) });
}

async function changeTopic(topic, topicAPI) {
    const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
    if (topicAPI === "good valid") {
        mockedFoodPlaces.mockGoodAPI(mockFetch)
    }
    else if (topicAPI === "bad empty"){
        mockedFoodPlaces.mockBadEmptyAPI(mockFetch)
    }
    else if (topicAPI === "bad invalid") {
        mockedFoodPlaces.mockBadInvalidAPI(mockFetch)
    }
    await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: topic } }) });
    expect(topicMenuSelect.value).toBe(topic);

}

async function checkNoneCard() {
    const card = await screen.findByTestId("result card other") as HTMLDivElement
    expect(card).toBeVisible()
    expect(card).toBeInTheDocument()
    expect(card.innerHTML).toBe("No data to show")
}

async function checkErrorCard() {
    const card = await screen.findByTestId("result card other") as HTMLDivElement
    expect(card).toBeVisible()
    expect(card).toBeInTheDocument()
    expect(card.innerHTML).toBe("Error. Our API request has failed")
}

async function checkReadyResultCard() {
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
}

