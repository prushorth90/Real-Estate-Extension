import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import { TypeFilter } from '../typeFilter'
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



describe("change value of type filter", () => {
    // see if unit test
    // it("should be able to see update of value filter of type", async () => {
    //     mockTabAPI()
    //     mockAddressAPI()

    //     await act(async () => { render(<App />) })

    //     const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
    //     mockNearbyPlacesAPI()

    //     await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
    //     mockSecondNearbyPlacesAPI()
    //     const type = screen.getByTestId("Input Type") as HTMLSelectElement
    //     await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
    //     const options = within(screen.getByRole('listbox'));
    //     await act(async () => { fireEvent.click(options.getByText(/Cafe/i)) });
    //     expect(type.value).toBe("Cafe")
    // });

    it("should be able to see card when change filter of type", async () => {
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
        await act(async () => { fireEvent.click(options.getByText(/Cafe/i)) });

        const card = await screen.findByTestId("result card") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()


        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake Bakery 2 ")

        const totalUserRating = await screen.findByTestId("result user rating total") as HTMLParagraphElement
        expect(totalUserRating.innerHTML).toBe("Total User Ratings: 10 ")

        const priceLevel = await screen.findByTestId("result price level") as HTMLParagraphElement
        expect(priceLevel.innerHTML).toBe("Price Level: 4")

        const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
        expect(vicinity.innerHTML).toBe(" Vicinity: Fake address 2 ")

        const photoButton = await screen.findByTestId("photo button") as HTMLButtonElement
        expect(photoButton).toBeInTheDocument()

    });

    it("should be able to see none card when change filter of type  as bad empty address", async () => {
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
        await act(async () => { fireEvent.click(options.getByText(/Cafe/i)) });


        const card = await screen.findByTestId("result card none") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")


    });

    it("should be able to see error card when change filter of type  as bad invalid food", async () => {
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
        await act(async () => { fireEvent.click(options.getByText(/Cafe/i)) });



        const card = await screen.findByTestId("result card other") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("Error. Our API request has failed")


    });

    it("should be able to see none card when change filter of type as bad empty address", async () => {
        mockGoodTabAPI()
        mockBadEmptyAddressAPI()


        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        //mockBadInvalidFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        // mockBadInvalidFoodAPI()

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Cafe/i)) });



        const card = await screen.findByTestId("result card none") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")


    });

    it("should be able to see none card when change filter of type  as bad invalid address", async () => {
        mockGoodTabAPI()
        mockBadInvalidAddressAPI()


        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        //mockBadInvalidFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        // mockBadInvalidFoodAPI()

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Cafe/i)) });


        const card = await screen.findByTestId("result card none") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")


    });

})

describe("change value of type filter to restaurant and see cuisine filter", () => {

    it("should be able to see added cuisine filter", async () => {
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

    it("should be able to see cards", async () => {
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

        const card = await screen.findByTestId("result card") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()

        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake Bakery 2 ")

        const totalUserRating = await screen.findByTestId("result user rating total") as HTMLParagraphElement
        expect(totalUserRating.innerHTML).toBe("Total User Ratings: 10 ")

        const priceLevel = await screen.findByTestId("result price level") as HTMLParagraphElement
        expect(priceLevel.innerHTML).toBe("Price Level: 4")

        const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
        expect(vicinity.innerHTML).toBe(" Vicinity: Fake address 2 ")

        const photoButton = await screen.findByTestId("photo button") as HTMLButtonElement
        expect(photoButton).toBeInTheDocument()



    });

    it("should be able to see none cards if bad empty food api", async () => {
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

        const card = await screen.findByTestId("result card none") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")

    });

    it("should be able to see error card", async () => {
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

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("Error. Our API request has failed")

    });


    it("should be able to see none card when change filter of type as bad empty address", async () => {
        mockGoodTabAPI()
        mockBadEmptyAddressAPI()


        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        //mockBadInvalidFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        // mockBadInvalidFoodAPI()

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const card = await screen.findByTestId("result card none") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")


    });

    it("should be able to see none card when change filter of type  as bad invalid address", async () => {
        mockGoodTabAPI()
        mockBadInvalidAddressAPI()


        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        //mockBadInvalidFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        // mockBadInvalidFoodAPI()

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const card = await screen.findByTestId("result card none") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")


    });


});

describe("change value of type filter to restaurant and then bakery so cuisine filter removed", () => {

    it("should not be able to see added cuisine filter", async () => {
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

        const secondType = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const optionsBakery = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(optionsBakery.getByText(/Bakery/i)) });
        expect(secondType.value).toBe("Bakery")

        expect(cuisine).not.toBeInTheDocument()


    });

    it("should not be able to see added cuisine filter even if bad empty food", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockBadEmptyFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement

        const secondType = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const optionsBakery = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(optionsBakery.getByText(/Bakery/i)) });
        expect(secondType.value).toBe("Bakery")

        expect(cuisine).not.toBeInTheDocument()


    });

    it("should not be able to see added cuisine filter even if bad invalid food", async () => {
        mockGoodTabAPI()
        mockGoodAddressAPI()

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockBadInvalidFoodAPI()

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement

        const secondType = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const optionsBakery = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(optionsBakery.getByText(/Bakery/i)) });
        expect(secondType.value).toBe("Bakery")

        expect(cuisine).not.toBeInTheDocument()


    });




});
