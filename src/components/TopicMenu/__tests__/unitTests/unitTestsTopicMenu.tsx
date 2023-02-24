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
    public constructor(active, url) {
        this.index = 3
        this.highlighted = true
        this.windowId = 0
        this.active = active
        this.incognito = true
        this.selected = true
        this.discarded = true
        this.autoDiscardable = true
        this.groupId = 3
        this.url = url
    }
}

async function mockGoodTabAPI() {
    await chrome.tabs.query.mockImplementation(async (queryInfo) => {
        let f = new Array<Tab>()
        let active = true
        let url = "https://www.realtor.com/realestateandhomes-detail/6224-S-Rockwell-St_Chicago_IL_60629_M83401-45847"
        f.push(new Tab(active, url))
        return Promise.resolve(f)

    })
}


function mockGoodAddressAPI() {
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

function mockBadEmptyAddressAPI() {
    mockFetch.mockResolvedValue({
        json: () => Promise.resolve({
            results: []
        },
        ),

    } as any)
}

async function mockBadInvalidAddressAPI() {
    await mockFetch.mockImplementation(async (queryInfo) => {
        let f = new Response(400)
        return Promise.resolve(f)

    })
}

function mockGoodFoodAPI() {
    mockFetch.mockResolvedValue({
        json: () => Promise.resolve({
            results: [{
                name: "Fake Bakery",
                price_level: 3,
                rating: 5,
                user_ratings_total: 90,
                vicinity: "Fake address",
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

function mockBadEmptyFoodAPI() {
    mockFetch.mockResolvedValue({
        json: () => Promise.resolve({
            results: []
        },
        ),

    } as any)
}

async function mockBadInvalidFoodAPI() {
    await mockFetch.mockImplementation(async (queryInfo) => {
        let f = new Response(400)
        return Promise.resolve(f)

    })
}


class Response {
    // could make obj for apartment like open weather data
    public headers;
    public ok;
    public redirected;
    public status;
    public body;
    public bodyUsed;
    public statusText;
    public trailer;
    public type;
    public url;
    public clone;
    public arrayBuffer;
    public blob;
    public formData;
    public json;
    public text;




    public constructor(status) {
        this.headers = 3
        this.ok = true
        this.redirected = 0
        this.status = status

    }
}

describe("when the topic menu has been rendered", () => {
    it("should show and check the values of topic menu", () => {
        render((<TopicContext.Provider value={["Topics", jest.fn()]}> <TopicMenu /></TopicContext.Provider>))
        
        const topicMenuSelect = screen.getByTestId("topic_menu_select")

        expect(topicMenuSelect).toBeVisible()
        expect(topicMenuSelect).toBeInTheDocument()

        const topicMenuInput = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        expect(topicMenuInput.value).toBe("Topics")
        
    });

    it("should show the topic select menu", async () => {

        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })
        const topicMenuInput = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        expect(topicMenuInput).toBeInTheDocument()
        expect(topicMenuInput.value).toBe("Topics")

    });

    it("should show and check the values the topic select menu even if bad empty address", async () => {

        mockGoodTabAPI()
        mockBadEmptyAddressAPI()

        await act(async () => { render(<App />) })
        const topicMenuInput = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        expect(topicMenuInput).toBeInTheDocument()
        expect(topicMenuInput.value).toBe("Topics")

    });

    it("should show and check the values the topic select menu even if bad invalid address", async () => {

        mockGoodTabAPI()
        mockBadInvalidAddressAPI()

        await act(async () => { render(<App />) })
        const topicMenuInput = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        expect(topicMenuInput).toBeInTheDocument()
        expect(topicMenuInput.value).toBe("Topics")

    });

});


describe("for the topic menu change event topic to food", () => {
    it("should be able to change topic to food", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockGoodFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        expect(topicMenuSelect.value).toBe("Food");
    });

    it("should be able to change topic to food", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockBadEmptyFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        expect(topicMenuSelect.value).toBe("Food");
    });

    it("should be able to change topic to food", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockBadInvalidFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        expect(topicMenuSelect.value).toBe("Food");
    });

    it("should be able to change topic to food", async () => {
        mockGoodTabAPI()
        mockBadEmptyAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        //mockGoodFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        expect(topicMenuSelect.value).toBe("Food");
    });
    
    it("should be able to change topic to food", async () => {
        mockGoodTabAPI()
        mockBadInvalidAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        expect(topicMenuSelect.value).toBe("Food");
    });


  
});

describe("for the topic menu change event food to topic", () => {

    it("should be able to go from food back to topic", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()


        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockGoodFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });

        expect(topicMenuSelect.value).toBe("Topics");
    });
    

    it("should be able to change topic to food", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockBadEmptyFoodAPI()


        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });

        expect(topicMenuSelect.value).toBe("Topics");
    });

    it("should be able to change topic to food", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockBadInvalidFoodAPI()


        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });

        expect(topicMenuSelect.value).toBe("Topics");
    });

    it("should be able to change topic to food", async () => {
        mockGoodTabAPI()
        mockBadEmptyAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });

        expect(topicMenuSelect.value).toBe("Topics");
    });

    it("should be able to change topic to food", async () => {
        mockGoodTabAPI()
        mockBadInvalidAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });

        expect(topicMenuSelect.value).toBe("Topics");
    });


});

