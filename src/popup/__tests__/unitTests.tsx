import "@testing-library/jest-dom/extend-expect"
import {MockedAddress} from '../../mocks/address/mockAddress'
import { MockedTab } from '../../mocks/tab/mockTab'
import * as testHelper from '../../testHelpers/testHelpers'

global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

let mockedTab = null
let mockedAddress = null

beforeEach(()=>{
  mockedTab = new MockedTab()
  mockedAddress = new MockedAddress()
})

afterEach(() => {
  mockedTab = null
  mockedAddress = null
})

describe("when the main component popup has been rendered", () => {

  it("should show the popup", async () => {
    mockedTab.mockGoodTabAPI(mockFetch)
    mockedAddress.mockGoodAddressAPI(mockFetch)
    await testHelper.openPopup()
  });

  it("should show the popup even if bad empty address", async () => {
    mockedTab.mockGoodTabAPI(mockFetch)
    mockedAddress.mockBadEmptyAddressAPI(mockFetch)
    await testHelper.openPopup()
  });

  it("should show the popup even if bad invalid address", async () => {
    mockedTab.mockGoodTabAPI(mockFetch)
    mockedAddress.mockBadInvalidAddressAPI(mockFetch)
    await testHelper.openPopup()
  });

});