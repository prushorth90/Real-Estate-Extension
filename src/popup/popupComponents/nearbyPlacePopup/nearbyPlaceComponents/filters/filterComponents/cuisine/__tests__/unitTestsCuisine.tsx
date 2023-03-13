import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, within } from "@testing-library/react";
import App from '../../../../../../../popup'
import { MockedTab } from '../../../../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../../../../mocks/address/mockAddress'
import { MockedPlaces } from '../../../../../../../../mocks/nearby/places/mockPlaces'
import * as testHelper from '../../../../../../../../testHelpers/testHelpers'

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


describe("For when the main-component have been rendered", () => {

    it("should be able to see cuisine filter", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Type", 3, "Restaurant")

        await checkCuisineComponent()

    });  

    it("should be able to see cuisine filter even if bad empty food api response", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "bad empty", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Type", 3, "Restaurant")

        await checkCuisineComponent()
    });  

    it("should be able to see cuisine filter even if bad invalid food api response", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "bad invalid", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Type", 3, "Restaurant")

        await checkCuisineComponent()
    });  

    it("should be able to see cuisine filter even if bad empty address api response", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Type", 3, "Restaurant")

        await checkCuisineComponent()
    });  

    it("should be able to see cuisine filter even if bad invalid address api response", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Type", 3, "Restaurant")

        await checkCuisineComponent()
    });  

});

describe("change value of cuisine filter", () => {

    it("should be able to see changed value of cuisine filter", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Type", 3, "Restaurant")
        await testHelper.changeFilter("Cuisine", 4 ,"Italian")
    });

    it("should be able to see changed value of cuisine filter even if bad invalid food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "bad invalid", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Type", 3, "Restaurant")
        await testHelper.changeFilter("Cuisine", 4, "Italian")
    });

    it("should be able to see changed value of cuisine filter even if bad empty food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "bad empty", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Type", 3, "Restaurant")
        await testHelper.changeFilter("Cuisine", 4, "Italian")
    });

    it("should be able to see changed value of cuisine filter even if bad empty address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Type", 3, "Restaurant")
        await testHelper.changeFilter("Cuisine", 4, "Italian")
    });

    it("should be able to see changed value of cuisine filter even if bad invalid address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Type", 3, "Restaurant")
        await testHelper.changeFilter("Cuisine", 4, "Italian")
    });

});

async function checkCuisineComponent() {
    const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
    expect(cuisine).toBeInTheDocument()
    expect(cuisine.value).toBe("Pizza")
}