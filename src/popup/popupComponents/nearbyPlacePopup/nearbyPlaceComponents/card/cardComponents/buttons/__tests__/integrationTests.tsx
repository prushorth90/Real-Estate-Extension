import "@testing-library/jest-dom/extend-expect"
import { act, screen,fireEvent } from "@testing-library/react";
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
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.clickPhotoButton("good valid", mockedPhoto, mockFetch)
        await testHelper.checkReadyPhoto()
    });

    it("should show no photo after click photo button", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        // special case change topic should return empty photos field
        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedPhoto.mockBadEmptyPhotoAPI(mockFetch)
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await testHelper.clickPhotoButton("", mockedPhoto, mockFetch)
        await testHelper.checkNonePhoto()
    });

    it("should show error after click photo button as network request failed", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        await testHelper.clickPhotoButton("bad invalid", mockedPhoto, mockFetch)
        await testHelper.checkErrorPhoto()
    });
});



