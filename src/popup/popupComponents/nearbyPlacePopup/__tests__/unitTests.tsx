import "@testing-library/jest-dom/extend-expect"
import { screen } from "@testing-library/react";
import { MockedTab } from '../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../mocks/address/mockAddress'
import { MockedPlaces } from '../../../../mocks/nearby/places/mockPlaces'
import * as testHelper from '../../../../testHelpers/testHelpers'

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

describe("when the main component nearby-popup has been rendered", () => {
    
    it("should show the nearby popup", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
        const nearbyPopup = screen.getByTestId("nearby-popup")
        expect(nearbyPopup).toBeInTheDocument()
    });

    it("should show the nearby popup even if bad empty food api response", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "bad empty", mockedPlaces, mockFetch)
        const nearbyPopup = screen.getByTestId("nearby-popup")
        expect(nearbyPopup).toBeInTheDocument()
    });

    it("should show the nearby popup even if bad invalid food api", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "bad invalid", mockedPlaces, mockFetch)
        const nearbyPopup = screen.getByTestId("nearby-popup")
        expect(nearbyPopup).toBeInTheDocument()
    });

    it("should show the nearby popup even if bad empty address", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        const nearbyPopup = screen.getByTestId("nearby-popup")
        expect(nearbyPopup).toBeInTheDocument()
    });

    it("should show the nearby popup even if bad invalid address", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        const nearbyPopup = screen.getByTestId("nearby-popup")
        expect(nearbyPopup).toBeInTheDocument()
    });
});

