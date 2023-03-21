import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent  } from "@testing-library/react";
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

describe("close photo dialog tests", () => {

    it("should close the photo dialog", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.clickPhotoButton("good valid", mockedPhoto, mockFetch)

        const photo = screen.getByTestId("photo ready") as HTMLImageElement
        closeDialog(photo)
    });

    it("should close the photo dialog even if no photo dialog", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.clickPhotoButton("bad empty", mockedPhoto, mockFetch)

        const photo = screen.getByTestId("photo none") as HTMLImageElement
        closeDialog(photo)
    });

    it("should close the photo dialog even if error photo dialog", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")

        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.clickPhotoButton("bad invalid", mockedPhoto, mockFetch)

        const photo = screen.getByTestId("photo error") as HTMLImageElement
        closeDialog(photo)
    });

});

function closeDialog(photo) {
    //https://stackoverflow.com/questions/59572341/fireevent-keydown-not-working-as-expected-on-my-jest-react-testing-library-tes
    fireEvent.keyDown((photo), {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27
    });
    expect(photo).not.toBeInTheDocument()
    expect(photo).not.toBeVisible()
}