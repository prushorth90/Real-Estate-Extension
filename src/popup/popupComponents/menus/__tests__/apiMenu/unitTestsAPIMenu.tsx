import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent } from "@testing-library/react";
import {TopicMenu} from "../../topicMenu/topicMenu";
import {App} from "../../../..";
import { TopicContext } from '../../../../popup'
import { MockedTab } from '../../../../../mocks/tab/mockTab';
import {MockedAddress} from '../../../../../mocks/address/mockAddress'
import { MockedPlaces} from '../../../../../mocks/nearby/places/mockPlaces'

global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

let mockedTab = null
let mockedAddress = null
let mockedFoodPlaces = null

beforeEach(() => {
    mockedTab = new MockedTab()
    mockedAddress = new MockedAddress()
    mockedFoodPlaces = new MockedPlaces()

})

afterEach(() => {
    mockedTab = null
    mockedAddress = null
    mockedFoodPlaces = null
})

describe("when the topic menu has been rendered", () => {
  

    it("should show the topic select menu", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })
        const apiMenuSelect = screen.getByTestId("api_menu_input") as HTMLSelectElement
        await act(async () => { fireEvent.change(apiMenuSelect, { target: { value: "Nearby Places" } }) });
       
        expect(apiMenuSelect.value).toBe("Nearby Places")

    });

});

