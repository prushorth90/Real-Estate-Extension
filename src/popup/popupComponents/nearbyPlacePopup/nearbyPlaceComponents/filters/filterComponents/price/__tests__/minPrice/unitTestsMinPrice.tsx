import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { screen, render, fireEvent, within,act } from "@testing-library/react";
import { MinPriceFilter } from '../../MinPriceFilter'
import { TopicContext } from '../../../../../../../../popup'
import { APIContext } from '../../../../filters'
import { NearbyPlaceAPIInput } from '../../../../../../../../../api/nearbyPlaces/nearbyPlaceAPIInput'
import { MockedTab } from '../../../../../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../../../../../mocks/address/mockAddress'
import { MockedPlaces } from '../../../../../../../../../mocks/nearby/places/mockPlaces'
import App from '../../../../../../../../popup'
import * as testHelper from '../../../../../../../../../testHelpers/testHelpers'

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

describe("for when the min price component renders", () => {

    it("should render Min  Price Filter ", () => {
        render(<APIContext.Provider value={[new NearbyPlaceAPIInput("Bakery")]}> <MinPriceFilter /></APIContext.Provider>)
        testHelper.checkFilterComponent("Min Price Level", "0")

    });
});

describe("change event for the value of filter", () => {

    it("should be able to see update filter values of min price", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Min Price Level", 4, "1")
    });

    it("should be able to see update filter values of min price", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Min Price Level", 4, "1")
        await testHelper.changeFilter("Min Price Level", 4, "0")
    });
});


