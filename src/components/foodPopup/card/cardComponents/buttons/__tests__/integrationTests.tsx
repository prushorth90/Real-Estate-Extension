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

function mockNearbyPlacesAPI(){
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

function mockNearbyPlacesPhotoAPI() {
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

describe("Event test click photo button", () => {
    
    it("should be able to see photo dialog after click photo button", async () => {
        mockTabAPI()
        mockAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockNearbyPlacesAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const photoButton = screen.getByTestId("photo button") as HTMLButtonElement
        
        await act(async () => { fireEvent.click(photoButton) });
        const foodPhoto = screen.getByTestId("food photo") as HTMLImageElement

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()

        //const photoDialog = await screen.findByTestId("photo dialogs")
        //expect(photoDialog).toBeInTheDocument()

        screen.debug(undefined, 10000)
    });

});

describe("Negative test suite", () => {

    it("should show no photo if click and photo res is undefined", async () => {
        mockTabAPI()
        mockAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockNearbyPlacesPhotoAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const photoButton = screen.getByTestId("photo button") as HTMLButtonElement

        await act(async () => { fireEvent.click(photoButton) });
        const foodPhoto = screen.getByTestId("food photo none") as HTMLImageElement

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()
    });

});
