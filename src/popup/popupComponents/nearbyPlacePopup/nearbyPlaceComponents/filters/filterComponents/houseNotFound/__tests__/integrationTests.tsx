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

describe("enter good coordinates and see submit button", () => {

    it("should be able to see submit button when enter good coordinates", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement
        expect(submit).toBeInTheDocument()

    });

    it("should remove submit button if good coordinate then bad invalid latitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement

        await enterLatitudeAndLongitude(1000, -87.9)

        expect(submit).not.toBeInTheDocument()

    });

    it("should remove submit if good coordinate then bad invalid longitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement

        await enterLatitudeAndLongitude(41.7, 1000)
        expect(submit).not.toBeInTheDocument()

    });

    it("should remove submit button if good coordinate then bad empty latitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement

        await enterLatitudeAndLongitude(null, -87.9)

        expect(submit).not.toBeInTheDocument()

    });

    it("should remove submit button if good coordinate then bad empty longitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement

        await enterLatitudeAndLongitude(41.7, null)
        expect(submit).not.toBeInTheDocument()

    });
})

describe("enter bad coordinates", () => {

   
    it("should not be able to see submit button if bad invalid latitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(1000, -87.9)
        const submit = await screen.queryByTestId("submit_coord") as HTMLSelectElement

        expect(submit).not.toBeInTheDocument()

    });

    it("should not be able to see submit button if bad invalid longitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(41.7, 1000)
        const submit = await screen.queryByTestId("submit_coord") as HTMLSelectElement

        expect(submit).not.toBeInTheDocument()

    });

    it("should not be able to see submit button if bad empty latitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(null, -87.9)
        const submit = await screen.queryByTestId("submit_coord") as HTMLSelectElement

        expect(submit).not.toBeInTheDocument()

    });

    it("should not be able to see submit button if bad empty longitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(41.7, null)
        const submit = await screen.queryByTestId("submit_coord") as HTMLSelectElement

        expect(submit).not.toBeInTheDocument()

    });

    it("should add submit button if bad empty latidude then good coord", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(null, -87.9)

        await enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement

        expect(submit).toBeInTheDocument()

    });

    it("should add submit button if bad empty longitude then good coord", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(41.7, null)
        await enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement

        expect(submit).toBeInTheDocument()

    });

    it("should add submit button if bad invalid latidude then good coord", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(1000, -87.9)

        await enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement

        expect(submit).toBeInTheDocument()

    });

    it("should add submit button if bad invalid longitude then good coord", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(41.7, 1000)

        await enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement

        expect(submit).toBeInTheDocument()

    });
})

describe("enter good coordinates and click submit button", () => {

    it("should be able to see filters when enter good coordinates", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(41.7, -87.9)
        await submitCoordinates("good valid")
        await testHelper.checkFilterComponent("Radius", "1500")
        await testHelper.checkFilterComponent("Min Price Level", "0")
        await testHelper.checkFilterComponent("Max Price Level", "4")
        await testHelper.checkFilterComponent("Type", "Bakery")
    });

    it("should be able to see places card when enter good coordinates", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()

        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

        await enterLatitudeAndLongitude(41.7, -87.9)
        await submitCoordinates("good valid")
        await testHelper.checkReadyResultCard()

    });
})

async function enterLatitudeAndLongitude(latitude, longitude) {
    const latField = await screen.findByTestId("latitude_input") as HTMLSelectElement
    await act(async () => {fireEvent.change(latField, { target: { value: latitude } })});

    const longField = await screen.findByTestId("longitude_input") as HTMLSelectElement
    await act(async () => { fireEvent.change(longField, { target: { value: longitude } }) });
}

async function submitCoordinates(placesAPI) {
    if (placesAPI === "good valid") {
        mockedPlaces.mockGoodAPI(mockFetch)
    }
    else if (placesAPI === "bad empty") {
        mockedPlaces.mockBadEmptyAPI(mockFetch)
    }
    else if (placesAPI === "bad invalid") {
        mockedPlaces.mockBadInvalidAPI(mockFetch)
    }
    const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement
    await act(async () => { fireEvent.click(submit) });
}