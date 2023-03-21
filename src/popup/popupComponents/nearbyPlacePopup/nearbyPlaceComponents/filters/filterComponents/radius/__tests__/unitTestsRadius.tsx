import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import {  screen, render, fireEvent,within ,act } from "@testing-library/react";
import { RadiusFilter } from '../radiusFilter'
import { TopicContext } from '../../../../../../../popup'
import { APIContext } from '../../../filters'
import { NearbyPlaceAPIInput } from '../../../../../../../../api/nearbyPlaces/nearbyPlaceAPIInput'
import { MockedTab } from '../../../../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../../../../mocks/address/mockAddress'
import { MockedPlaces } from '../../../../../../../../mocks/nearby/places/mockPlaces'
import App from '../../../../../../../popup'
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

describe("Components Render", () => {

    it("should render Radius Filter ", () => {
        render(<APIContext.Provider value={[new NearbyPlaceAPIInput("Bakery")]}> <RadiusFilter /></APIContext.Provider>)
        testHelper.checkFilterComponent("Radius", "1500")
    });
});

describe("Event test change value of filter", () => {

    it("should change from 1500 to 1000 ", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Radius", 2, "1000")
    });

    it("should change from 1500 to 1000 to 1500", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Radius", 2, "1000")
        await testHelper.changeFilter("Radius", 2, "1500")
    });
});