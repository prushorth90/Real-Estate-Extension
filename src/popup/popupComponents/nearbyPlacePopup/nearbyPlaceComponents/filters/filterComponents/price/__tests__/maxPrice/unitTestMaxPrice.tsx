import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react";
import { MaxPriceFilter } from '../../maxPriceFilter'
import { APIContext } from '../../../../filters'
import { NearbyPlaceAPIInput } from '../../../../../../../../../api/nearbyPlaces/nearbyPlaceAPIInput'
import { MockedTab } from '../../../../../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../../../../../mocks/address/mockAddress'
import { MockedPlaces } from '../../../../../../../../../mocks/nearby/places/mockPlaces'
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

describe("for when the max price component renders", () => {

    it("should render Max Price Filter ", () => {
        render(<APIContext.Provider value={[new NearbyPlaceAPIInput("Bakery")]}> <MaxPriceFilter /></APIContext.Provider>)
        testHelper.checkFilterComponent("Max Price Level", "4")
    });

});

describe("change event for the value of filter", () => {

    it("should change from 4 to 3 ", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Max Price Level", 5, "3")
    });

    it("should change from 4 to 3 to 4", async() => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Max Price Level", 5, "3")
        await testHelper.changeFilter("Max Price Level", 5, "4")
    });
});
