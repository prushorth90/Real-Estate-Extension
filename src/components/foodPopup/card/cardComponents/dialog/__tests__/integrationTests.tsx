import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import App, { TopicContext } from '../../../../../../popup/popup'
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




    public constructor(url) {
        this.headers = 3
        this.ok = true
        this.redirected = 0
        this.status = true
        this.url = url

    }
}

async function mockGoodPhotoAPI() {

    await mockFetch.mockImplementation(async (queryInfo) => {
        let f = new Response("fake url")
        return Promise.resolve(f)

    })

}

function mockBadEmptyPhotoAPI() {
    mockFetch.mockResolvedValue({
        json: () => Promise.resolve({
            results: [{
                name: "Bakery 1",
                price_level: 0,
                rating: 2,
                user_ratings_total: 56,
                vicinity: "Fake address 1",
                photos: undefined,
                url: "fake url"
            }]


        },
        ),

    } as any)
}

async function mockBadInvalidPhotoAPI() {

    await mockFetch.mockImplementation(async (queryInfo) => {
        let f = new Response(undefined)
        return Promise.resolve(f)

    })

}
describe("close photo dialog tests", () => {

    it("should close the photo dialog", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockGoodFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockGoodPhotoAPI()

        const photoButton = screen.getByTestId("photo button") as HTMLButtonElement

        await act(async () => { fireEvent.click(photoButton) });
        const foodPhoto = screen.getByTestId("food photo") as HTMLImageElement
        //https://stackoverflow.com/questions/59572341/fireevent-keydown-not-working-as-expected-on-my-jest-react-testing-library-tes
        fireEvent.keyDown(screen.getByTestId("food photo"), {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            charCode: 27
        });
        expect(foodPhoto).not.toBeInTheDocument()
        expect(foodPhoto).not.toBeVisible()
    });

    it("should close the photo dialog", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockBadEmptyPhotoAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const photoButton = screen.getByTestId("photo button") as HTMLButtonElement

        await act(async () => { fireEvent.click(photoButton) });
        const foodPhoto = screen.getByTestId("food photo none") as HTMLImageElement
        //https://stackoverflow.com/questions/59572341/fireevent-keydown-not-working-as-expected-on-my-jest-react-testing-library-tes
        fireEvent.keyDown(screen.getByTestId("food photo none"), {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            charCode: 27
        });
        expect(foodPhoto).not.toBeInTheDocument()
        expect(foodPhoto).not.toBeVisible()
    });

    it("should close the photo dialog", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockGoodFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockBadInvalidPhotoAPI()

        const photoButton = screen.getByTestId("photo button") as HTMLButtonElement

        await act(async () => { fireEvent.click(photoButton) });
        const foodPhoto = screen.getByTestId("food photo error") as HTMLImageElement
        //https://stackoverflow.com/questions/59572341/fireevent-keydown-not-working-as-expected-on-my-jest-react-testing-library-tes
        fireEvent.keyDown(screen.getByTestId("food photo error"), {
            key: "Escape",
            code: "Escape",
            keyCode: 27,
            charCode: 27
        });
        expect(foodPhoto).not.toBeInTheDocument()
        expect(foodPhoto).not.toBeVisible()
    });

});
