import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import { RadiusFilter } from '../radiusFilter'
import App, { TopicContext } from '../../../../../../popup/popup'
import { APIContext } from '../../../filters'
import { APIInput } from '../../../apiInput'
import { InputLabel } from '@material-ui/core';
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

function mockThirdNearbyPlacesAPI() {
    mockFetch.mockResolvedValue({
        json: () => Promise.resolve({
            results: Array(0)

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




    public constructor(status) {
        this.headers = 3
        this.ok = true
        this.redirected = 0
        this.status = status

    }
}


async function mockBadFoodAPI() {

    await mockFetch.mockImplementation(async (queryInfo) => {
        let f = new Response(400)
        return Promise.resolve(f)

    })

}
describe("Event test change value of radius filter", () => {

    it("should be able to see update of value filter of radius", async () => {
        mockTabAPI()
        mockAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockNearbyPlacesAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockSecondNearbyPlacesAPI()

        const radius = screen.getByTestId("Input Radius") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[1]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/1000/i)) });
        expect(radius.value).toBe("1000")
    });

    it("should be able to see card when change filter of radius", async () => {
        mockTabAPI()
        mockAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockNearbyPlacesAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockSecondNearbyPlacesAPI()

        const radius = screen.getByTestId("Input Radius") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[1]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/1000/i)) });

        const card = await screen.findByTestId("result card") as HTMLDivElement
        expect(card).toBeVisible()


    });

    
    it("should be able to see update to cards values when change filter of radius", async () => {
        mockTabAPI()
        mockAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockNearbyPlacesAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockSecondNearbyPlacesAPI()

        const mradius = screen.getByTestId("Input Radius") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[1]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/1000/i)) });

        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake Bakery ")

        const totalUserRating = await screen.findByTestId("result user rating total") as HTMLParagraphElement
        expect(totalUserRating.innerHTML).toBe("Total User Ratings: 90 ")

        const priceLevel = await screen.findByTestId("result price level") as HTMLParagraphElement
        expect(priceLevel.innerHTML).toBe("Price Level: 3")

        const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
        expect(vicinity.innerHTML).toBe(" Vicinity: Fake address ")

        const photoButton = await screen.findByTestId("photo button") as HTMLButtonElement
        expect(photoButton).toBeInTheDocument()

        screen.debug(undefined, 100000)
    });

    it("should be able to see update to cards values when change filter of radius", async () => {
        mockTabAPI()
        mockAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockThirdNearbyPlacesAPI() 

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const foodPhoto = await screen.findByTestId("result card none") as HTMLParagraphElement

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()

        expect(foodPhoto.innerHTML).toBe("No data to show")

        screen.debug(undefined,10000)
    });

    it("should be able to see error", async () => {
        mockTabAPI()
        mockAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockBadFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        
        const foodPhoto = await screen.findByTestId("result card other") as HTMLImageElement

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()
       
    });

   
});

