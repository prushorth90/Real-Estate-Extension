import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act,screen, render } from "@testing-library/react";
import App from "../popup";
import {MockedAddress} from '../../mocks/address/mockAddress'
import { MockedTab } from '../../mocks/tab/mockTab'

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

    await act(async () => { render(<App />) })
    const popup= screen.getByTestId("popup") 

    expect(popup).toBeInTheDocument()

  });

  it("should show the popup even if bad empty address", async () => {

    mockedTab.mockGoodTabAPI(mockFetch)
    mockedAddress.mockBadEmptyAddressAPI(mockFetch)

    await act(async () => { render(<App />) })
    const popup = screen.getByTestId("popup")

    expect(popup).toBeInTheDocument()


  });

  it("should show the popup even if bad invalid address", async () => {

    mockedTab.mockGoodTabAPI(mockFetch)
    mockedAddress.mockBadInvalidAddressAPI(mockFetch)

    await act(async () => { render(<App />) })
    const popup = screen.getByTestId("popup")

    expect(popup).toBeInTheDocument()

  });

});