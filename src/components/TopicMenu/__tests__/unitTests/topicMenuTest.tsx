import React from 'react'
import ReactDOM from 'react-dom'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import {TopicMenu} from "../../topicMenu";
import {App} from "../../../../popup";
import { TopicContext } from '../../../../popup/popup'
import { chrome } from 'jest-chrome'

global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

class Tab {
    // could make obj for apartment like open weather data
    public index;
    public pinned;
    public highlighted;
    public windowId;
    public active;
    public incognito;
    public selected;
    public discarded;
    public autoDiscardable;
    public groupId;
    public url;
    public constructor() {
        this.index = 3
        this.highlighted = true
        this.windowId = 0
        this.active = true
        this.incognito = true
        this.selected = true
        this.discarded = true
        this.autoDiscardable = true
        this.groupId = 3
        this.url = "https://www.realtor.com/realestateandhomes-detail/6224-S-Rockwell-St_Chicago_IL_60629_M83401-45847"
    }
}

async function mockTabAPI() {
    await chrome.tabs.query.mockImplementation(async (queryInfo) => {
        let f = new Array<Tab>()
        f.push(new Tab())
        return Promise.resolve(f)

    })
}

function mockAddressAPI() {
    mockFetch.mockResolvedValue({
        json: () => Promise.resolve({
            results: [{

                geometry: {
                    location: {
                        lat: 41.814637,
                        lng: -87.596083
                    }
                }
            }]


        },
        ),

    } as any)
}

function mockNearbyPlacesAPI() {
    mockFetch.mockResolvedValue({
        json: () => Promise.resolve({
            results: [{
                name: "Bakery 1",
                price_level: 0,
                rating: 2,
                user_ratings_total: 56,
                vicinity: "Fake address 1",
                photos: [
                    {
                        height: 1840,
                        photo_reference: "fake photo reference",
                        width: 3264
                    }
                ],
                url: "fake url"
            }]


        },
        ),

    } as any)
}

function mockSecondNearbyPlacesAPI() {
    mockFetch.mockResolvedValue({
        json: () => Promise.resolve({
            results: [{
                name: "Fake Bakery",
                price_level: 3,
                rating: 5,
                user_ratings_total: 90,
                vicinity: "Fake address"
            }]


        },
        ),

    } as any)
}

describe("Components Render", () => {
    // 1. IS (<TEXT>)OFELE IN DOM,
    it("should render Topic Menu", () => {
        // 2. render
        render((<TopicContext.Provider value={["Topics", jest.fn()]}> <TopicMenu /></TopicContext.Provider>))

    });
});



describe("Topic Select Menu UI", () => {

    it("should make topic select menu visible to user", () => {

        render((<TopicContext.Provider value={["Topics", jest.fn()]}> <TopicMenu /></TopicContext.Provider>))

        const topicMenuSelect = screen.getByTestId("topic_menu_select")

        expect(topicMenuSelect).toBeVisible()

    });

    it("should make topic select menu visible to user", () => {

        render((<TopicContext.Provider value={["Topics", jest.fn()]}> <TopicMenu /></TopicContext.Provider>))

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        expect(topicMenuSelect.value).toBe("Topics")

    });


    it("should have topic select menu be present in document", () => {

        render((<TopicContext.Provider value={["Topics", jest.fn()]}> <TopicMenu /></TopicContext.Provider>))

        const topicMenu = screen.getByTestId("topic_menu_select")

        expect(topicMenu).toBeInTheDocument()
    });


});

// BECAUSE TOPICMENU DOES NOT HAVE SETTOPIC ONLY JEST.FN() IDK
describe("Topic Select Menu Event Tests", () => {
    it("should be able to change topic to food", async () => {
        //can copy idea with price filters later
        mockTabAPI()
        mockAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockNearbyPlacesAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        expect(topicMenuSelect.value).toBe("Food");
    });

    it("should be able to go from topic to food back to topic", async () => {
        mockTabAPI()
        mockAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockNearbyPlacesAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });

        expect(topicMenuSelect.value).toBe("Topics");
    });

    it("should be able to go from topic to food back to topic back to food", async () => {
        mockTabAPI()
        mockAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockNearbyPlacesAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });


        expect(topicMenuSelect.value).toBe("Food");
    });
});
