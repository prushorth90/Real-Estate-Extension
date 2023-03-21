import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent,within } from "@testing-library/react";
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

describe("change value of radius filter to see cards", () => {

    it("should be able to see ready results card when change filter of radius", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Radius", 2, "1000")
        await testHelper.checkReadyResultCard()
    });

    it("should be able to see none card when change filter of radius as bad empty food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "bad empty", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Radius", 2, "1000")
        await testHelper.checkNoneCard()
    });

    it("should be able to see error card when change filter of radius as bad invalid food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "bad invalid", mockedPlaces, mockFetch)
        await testHelper.changeFilter("Radius",2, "1000")
        await testHelper.checkErrorCard()
    });

    it("should be able to see none card when change filter of radius as bad empty address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        //await testHelper.changeFilter("Radius", 2, "1000")
        await testHelper.checkHouseNotFoundCard()
    });

    it("should be able to see none card when change filter of radius as bad invalid address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        //await testHelper.changeFilter("Radius", 2, "1000")
        await testHelper.checkHouseNotFoundCard()
    });
});

