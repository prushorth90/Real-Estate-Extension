import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent } from "@testing-library/react";
import App from '../../../../../../../popup'
import { MockedTab } from '../../../../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../../../../mocks/address/mockAddress'
import { MockedPlaces } from '../../../../../../../../mocks/nearby/places/mockPlaces'
import { MockedPhoto } from '../../../../../../../../mocks/nearby/photos/mockPhoto'
import * as testHelper from '../../../../../../../../testHelpers/testHelpers'

global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

let mockedTab = null
let mockedAddress = null
let mockedPlaces = null
let mockedPhoto = null
beforeEach(() => {
    mockedTab = new MockedTab()
    mockedAddress = new MockedAddress()
    mockedPlaces = new MockedPlaces()
    mockedPhoto = new MockedPhoto()
})

afterEach(() => {
    mockedTab = null
    mockedAddress = null
    mockedPlaces = null
    mockedPhoto = null
})

describe("click photo button and see dialog open", () => {

    it("should be able to see photo dialog after click photo button", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)

        await testHelper.clickPhotoButton("good valid", mockedPhoto, mockFetch)
        await testHelper.checkReadyPhoto()
    });

    it("should show no photo after click photo button", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await testHelper.clickPhotoButton("bad empty", mockedPhoto, mockFetch)
        await testHelper.checkNonePhoto()
    });

    it("should show error after click photo button as network request failed", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)

        await testHelper.clickPhotoButton("bad invalid", mockedPhoto, mockFetch)
        await testHelper.checkErrorPhoto()
    });
});



