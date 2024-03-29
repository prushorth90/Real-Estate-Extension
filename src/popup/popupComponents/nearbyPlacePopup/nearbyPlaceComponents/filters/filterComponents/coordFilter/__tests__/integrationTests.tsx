import "@testing-library/jest-dom/extend-expect"
import { screen } from "@testing-library/react";
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
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement
        expect(submit).toBeInTheDocument()

    });

    it("should remove submit button if good coordinate then bad invalid latitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement
        await testHelper.enterLatitudeAndLongitude(1000, -87.9)
        expect(submit).not.toBeInTheDocument()
    });

    it("should remove submit if good coordinate then bad invalid longitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement
        await testHelper.enterLatitudeAndLongitude(41.7, 1000)
        expect(submit).not.toBeInTheDocument()
    });

    it("should remove submit button if good coordinate then bad empty latitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement
        await testHelper.enterLatitudeAndLongitude(null, -87.9)
        expect(submit).not.toBeInTheDocument()
    });

    it("should remove submit button if good coordinate then bad empty longitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement
        await testHelper.enterLatitudeAndLongitude(41.7, null)
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
        await testHelper.enterLatitudeAndLongitude(1000, -87.9)
        const submit = await screen.queryByTestId("submit_coord") as HTMLSelectElement
        expect(submit).not.toBeInTheDocument()
    });

    it("should not be able to see submit button if bad invalid longitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(41.7, 1000)
        const submit = await screen.queryByTestId("submit_coord") as HTMLSelectElement
        expect(submit).not.toBeInTheDocument()

    });

    it("should not be able to see submit button if bad empty latitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(null, -87.9)
        const submit = await screen.queryByTestId("submit_coord") as HTMLSelectElement
        expect(submit).not.toBeInTheDocument()
    });

    it("should not be able to see submit button if bad empty longitude", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(41.7, null)
        const submit = await screen.queryByTestId("submit_coord") as HTMLSelectElement
        expect(submit).not.toBeInTheDocument()
    });

    it("should add submit button if bad empty latidude then good coord", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(null, -87.9)
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement
        expect(submit).toBeInTheDocument()
    });

    it("should add submit button if bad empty longitude then good coord", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(41.7, null)
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement
        expect(submit).toBeInTheDocument()
    });

    it("should add submit button if bad invalid latidude then good coord", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(1000, -87.9)
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
        const submit = await screen.findByTestId("submit_coord") as HTMLSelectElement
        expect(submit).toBeInTheDocument()

    });

    it("should add submit button if bad invalid longitude then good coord", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(41.7, 1000)
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
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
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
        await testHelper.submitCoordinates("good valid", mockedPlaces, mockFetch)
        await testHelper.checkFilterComponent("Radius", "1500")
        await testHelper.checkFilterComponent("Min Price Level", "0")
        await testHelper.checkFilterComponent("Max Price Level", "4")
        await testHelper.checkFilterComponent("Type", "Bakery")
    });

    it("should be able to see filters when enter good coordinates but bad empty food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
        await testHelper.submitCoordinates("bad empty", mockedPlaces, mockFetch)
        await testHelper.checkFilterComponent("Radius", "1500")
        await testHelper.checkFilterComponent("Min Price Level", "0")
        await testHelper.checkFilterComponent("Max Price Level", "4")
        await testHelper.checkFilterComponent("Type", "Bakery")
    });

    it("should be able to see filters when enter good coordinates but bad invalid food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
        await testHelper.submitCoordinates("bad invalid", mockedPlaces, mockFetch)
        await testHelper.checkFilterComponent("Radius", "1500")
        await testHelper.checkFilterComponent("Min Price Level", "0")
        await testHelper.checkFilterComponent("Max Price Level", "4")
        await testHelper.checkFilterComponent("Type", "Bakery")
    });

    it("should be able to see places card when enter good coordinates but bad invalid food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
        await testHelper.submitCoordinates("good valid", mockedPlaces, mockFetch)
        await testHelper.checkReadyResultCard()
    });

    it("should be able to see error places card when enter good coordinates but bad invalid food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
        await testHelper.submitCoordinates("bad invalid", mockedPlaces, mockFetch)
        await testHelper.checkErrorCard()
    });

    it("should be able to see none places card when enter good coordinates but bad empty food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.enterLatitudeAndLongitude(41.7, -87.9)
        await testHelper.submitCoordinates("bad empty", mockedPlaces, mockFetch)
        await testHelper.checkNoneCard()
    });
})

