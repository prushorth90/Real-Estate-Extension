import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import {render } from "@testing-library/react";
import { TypeFilter } from '../typeFilter'
import { APIContext } from '../../../filters'
import { NearbyPlaceAPIInput } from '../../../../../../../../api/nearbyPlaces/nearbyPlaceAPIInput'
import { MockedTab } from '../../../../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../../../../mocks/address/mockAddress'
import { MockedPlaces } from '../../../../../../../../mocks/nearby/places/mockPlaces'
import { FoodType } from '../types/foodType'
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

    it("should render type Filter ", () => {
        render(<APIContext.Provider value={[new NearbyPlaceAPIInput("Bakery")]}> <TypeFilter options={Object.values(FoodType)}/></APIContext.Provider>)
        testHelper.checkFilterComponent("Type", "Bakery")
    });
});

describe("change value of type filter", () => {

    it("should change from bakery to cafe ", async() => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Type", 3, "Cafe")
    });

    it("should change from bakery to cafe to bakery", async() => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Type", 3, "Cafe")
        await testHelper.changeFilter("Type", 3, "Bakery")
    });
});