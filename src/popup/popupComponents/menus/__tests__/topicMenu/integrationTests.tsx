import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent } from "@testing-library/react";
import { App } from "../../../..";
import { MockedTab } from '../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../mocks/address/mockAddress'
import { MockedPlaces } from '../../../../../mocks/nearby/places/mockPlaces'
import * as testHelper from '../../../../../testHelpers/testHelpers'
global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

let mockedTab = null
let mockedAddress = null
let mockedPlaces = null

beforeEach(() => {
    mockedTab = new MockedTab()
    mockedAddress = new MockedAddress()
    mockedPlaces = new MockedPlaces()

})

afterEach(() => {
    mockedTab = null
    mockedAddress = null
    mockedPlaces = null
})

describe("tests when change from topic to food", () => {

    it("should be able to see ready result cards", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)

        await testHelper.checkReadyResultCard()
    });

    it("should be able to see none card as empty food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "bad empty", mockedPlaces, mockFetch)

        await testHelper.checkNoneCard()
    });

    it("should be able to see error cards as bad food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "bad invalid", mockedPlaces, mockFetch)

        await testHelper.checkErrorCard()
    });

    it("should be able to see none card as bad address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await testHelper.checkHouseNotFoundCard()
    });

    it("should be able to see none card as invalid address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await testHelper.checkHouseNotFoundCard()
    });

});

describe("tests when change from food to topic", () => {

    it("should be able to see no cards", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)

        const card = await screen.findByTestId("result card") as HTMLDivElement

        await testHelper.changeTopic("Topics", "", mockedPlaces, mockFetch)

        expect(card).not.toBeInTheDocument()

    });

    it("should be able to see no cards if empty food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "bad empty", mockedPlaces, mockFetch)

        const card = await screen.findByTestId("result card other") as HTMLDivElement

        await testHelper.changeTopic("Topics", "", mockedPlaces, mockFetch)
        expect(card).not.toBeInTheDocument()

    });

    it("should be able to see no cards if bad food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "bad invalid", mockedPlaces, mockFetch)

        const card = await screen.findByTestId("result card other") as HTMLDivElement

        await testHelper.changeTopic("Topics", "", mockedPlaces, mockFetch)
        expect(card).not.toBeInTheDocument()

    });

    it("should be able to see no cards if bad address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        await testHelper.changeTopic("Topics", "", mockedPlaces, mockFetch)

        expect(card).not.toBeInTheDocument()
    });

    it("should be able to see no cards if invalid address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        await testHelper.changeTopic("Topics", "", mockedPlaces, mockFetch)

        expect(card).not.toBeInTheDocument()
    });

});


describe("tests when change from food then api choice from nearby to apichoice", () => {

    it("should be able to see no cards", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)

        const card = await screen.findByTestId("result card") as HTMLDivElement

        await testHelper.changeInAPIMenu("API Choices")

        expect(card).not.toBeInTheDocument()

    });

    it("should be able to see no cards if empty food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "bad empty", mockedPlaces, mockFetch)

        const card = await screen.findByTestId("result card other") as HTMLDivElement

        await testHelper.changeInAPIMenu("API Choices")
        expect(card).not.toBeInTheDocument()

    });

    it("should be able to see no cards if bad food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "bad invalid", mockedPlaces, mockFetch)

        const card = await screen.findByTestId("result card other") as HTMLDivElement

        await testHelper.changeInAPIMenu("API Choices")
        expect(card).not.toBeInTheDocument()

    });

});
