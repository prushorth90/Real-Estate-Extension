import "@testing-library/jest-dom/extend-expect"
import { MockedTab } from '../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../mocks/address/mockAddress'
import * as testHelper from '../../../../../testHelpers/testHelpers'
import { screen } from "@testing-library/react";

global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

let mockedTab = null
let mockedAddress = null

beforeEach(() => {
    mockedTab = new MockedTab()
    mockedAddress = new MockedAddress()

})

afterEach(() => {
    mockedTab = null
    mockedAddress = null
})

describe("tests when change from api choice to nearby place", () => {

    it("should see topic menu", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        await testHelper.checkTopicMenu(topicMenuSelect,"Topics")
    });

    it("should see topic menu if bad empty addr", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        await testHelper.checkTopicMenu(topicMenuSelect, "Topics")
    });

    it("should see topic menu if bad invalid addr", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        await testHelper.checkTopicMenu(topicMenuSelect, "Topics")
    });
});

describe("tests when change from nearby place to api choice", () => {

    it("should remove topic menu", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        await testHelper.changeInAPIMenu("API Choices")
        expect(topicMenuSelect).not.toBeInTheDocument()
    });

    it("should remove topic menu if bad empty addr", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        await testHelper.changeInAPIMenu("API Choices")
        expect(topicMenuSelect).not.toBeInTheDocument() 
    });
    it("should be able to see menu value if bad invalid addr", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)
        await testHelper.openPopup()
        await testHelper.changeInAPIMenu("Nearby Places")
        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        await testHelper.changeInAPIMenu("API Choices")
        expect(topicMenuSelect).not.toBeInTheDocument()
    });
});

