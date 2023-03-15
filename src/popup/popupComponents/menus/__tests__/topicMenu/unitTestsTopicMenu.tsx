import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent } from "@testing-library/react";
import {TopicMenu} from "../../topicMenu/topicMenu";
import {App} from "../../../..";
import { TopicContext } from '../../../../popup'
import { MockedTab } from '../../../../../mocks/tab/mockTab';
import {MockedAddress} from '../../../../../mocks/address/mockAddress'
import { MockedPlaces} from '../../../../../mocks/nearby/places/mockPlaces'
import * as testHelper from '../../../../../testHelpers/testHelpers'

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

describe("when the topic menu has been rendered", () => {
    it("should show and check the values of topic menu", () => {
        render((<TopicContext.Provider value={["Topics", jest.fn()]}> <TopicMenu /></TopicContext.Provider>))
        checkTopicMenu()
        
    });

    it("should show the topic select menu", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        checkTopicMenu()

    });

    it("should show and check the values the topic select menu even if bad empty address", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)
        await testHelper.changeToNearbyPlaces()
        checkTopicMenu()

    });

    it("should show and check the values the topic select menu even if bad invalid address", async () => {

        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()
        checkTopicMenu()

    });

});

describe("for the topic menu change event topic to food", () => {
    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()

        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)
    });

    it("should be able to change topic to food even if bad empty nearby place api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()

        await testHelper.changeTopic("Food", "bad empty", mockedPlaces, mockFetch)

    });

    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()

        await testHelper.changeTopic("Food", "bad invalid", mockedPlaces, mockFetch)

    });

    it("should be able to change topic to food even if bad empty addr", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()

        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

    });
    
    it("should be able to change topic to food even if bad invalid addr", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()

        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)

    });
  
});

describe("for the topic menu change event food to topic", () => {

    it("should be able to go from food back to topic", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)


        await testHelper.changeToNearbyPlaces()

        await testHelper.changeTopic("Food", "good valid", mockedPlaces, mockFetch)

        await testHelper.changeTopic("Topics", "", mockedPlaces, mockFetch)
    });
    

    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()

        await testHelper.changeTopic("Food", "bad empty", mockedPlaces, mockFetch)
        await testHelper.changeTopic("Topics", "", mockedPlaces, mockFetch)
    });

    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()

        await testHelper.changeTopic("Food", "bad invalid", mockedPlaces, mockFetch)        
        await testHelper.changeTopic("Topics", "", mockedPlaces, mockFetch)

    });

    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()

        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)  
        await testHelper.changeTopic("Topics", "", mockedPlaces, mockFetch)
    });

    it("should be able to change topic to food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)

        await testHelper.changeToNearbyPlaces()

        await testHelper.changeTopic("Food", "", mockedPlaces, mockFetch)
        await testHelper.changeTopic("Topics", "", mockedPlaces, mockFetch)
    });


});

function checkTopicMenu() {
    const topicMenuInput = screen.getByTestId("topic_menu_input") as HTMLSelectElement
    expect(topicMenuInput).toBeInTheDocument()
    expect(topicMenuInput.value).toBe("Topics")
}

