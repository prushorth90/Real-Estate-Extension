import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import { CuisineFilter } from '../cuisineFilter'
import App, { TopicContext } from '../../../../../../popup/popup'
import { APIContext } from '../../../filters'
import { APIInput } from '../../../apiInput'
import UserEvent from '@testing-library/user-event'
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

function mockSecondGoodFoodAPI() {
    mockFetch.mockResolvedValue({
        json: () => Promise.resolve({
            results: [{
                name: "Fake Bakery 2",
                price_level: 4,
                rating: 3,
                user_ratings_total: 10,
                vicinity: "Fake address 2"
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



describe("For when the main-component have been rendered", () => {

    it("should be able to see cuisine filter", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockGoodFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockSecondGoodFoodAPI()

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
        expect(cuisine).toBeInTheDocument()
        expect(cuisine.value).toBe("Pizza")

    });  

    it("should be able to see cuisine filter even if bad empty food api response", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockBadEmptyFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockBadEmptyFoodAPI()

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
        expect(cuisine).toBeInTheDocument()
        expect(cuisine.value).toBe("Pizza")

    });  

    it("should be able to see cuisine filter even if bad invalid food api response", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockBadInvalidFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockBadInvalidFoodAPI()

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
        expect(cuisine).toBeInTheDocument()
        expect(cuisine.value).toBe("Pizza")

    });  

    it("should be able to see cuisine filter even if bad empty address api response", async () => {
        mockGoodTabAPI()
        mockBadEmptyAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
        expect(cuisine).toBeInTheDocument()
        expect(cuisine.value).toBe("Pizza")

    });  

    it("should be able to see cuisine filter even if bad invalid address api response", async () => {
        mockGoodTabAPI()
        mockBadInvalidAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockBadInvalidFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockBadInvalidFoodAPI()

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
        expect(cuisine).toBeInTheDocument()
        expect(cuisine.value).toBe("Pizza")

    });  

});


describe("change value of cuisine filter", () => {

    it("should be able to see changed value of cuisine filter", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockGoodFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockSecondGoodFoodAPI()

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
        const cuisineOptions = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(cuisineOptions.getByText(/Italian/i)) });
        expect(cuisine.value).toBe("Italian")


    });

    it("should be able to see changed value of cuisine filter even if bad invalid food", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockBadInvalidFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockBadInvalidFoodAPI()

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
        const cuisineOptions = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(cuisineOptions.getByText(/Italian/i)) });
        expect(cuisine.value).toBe("Italian")


    });

    it("should be able to see changed value of cuisine filter even if bad empty food", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockBadEmptyFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockBadEmptyFoodAPI()

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
        const cuisineOptions = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(cuisineOptions.getByText(/Italian/i)) });
        expect(cuisine.value).toBe("Italian")


    });

    it("should be able to see changed value of cuisine filter even if bad empty address", async () => {
        mockGoodTabAPI()
        mockBadEmptyAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
        const cuisineOptions = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(cuisineOptions.getByText(/Italian/i)) });
        expect(cuisine.value).toBe("Italian")


    });

    it("should be able to see changed value of cuisine filter even if bad invalid address", async () => {
        mockGoodTabAPI()
        mockBadInvalidAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
        const cuisineOptions = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(cuisineOptions.getByText(/Italian/i)) });
        expect(cuisine.value).toBe("Italian")


    });

});