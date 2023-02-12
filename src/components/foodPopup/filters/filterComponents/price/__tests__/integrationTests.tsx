import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import { MaxPriceFilter } from '../maxPriceFilter'
import { MinPriceFilter } from '../MinPriceFilter'
import App, { TopicContext } from '../../../../../../popup/popup'
import { APIContext } from '../../../filters'
import { APIInput } from '../../../apiInput'


describe("Event test change value of max price filter", () => {

    global.fetch = jest.fn()
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>
    it("should be able to see update to cards when change filter of max price", async () => {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({
                results: [{
                    icon: "jo",
                    icon_background_colour: "jo",
                    name: "Prushorth Prushti",
                    opening_hours: {
                        open_now: true
                    },
                    photos: [{
                        height: 90,
                        photo_reference: "jo",
                        width: 80
                    }],
                    price_level: 9,
                    rating: 9,
                    user_ratings_total: 90,
                    vicinity: "ko"
                }]


            },
            ),

        } as any)

        let coordinate = {
            "results": [{
                "geometry": {
                    "location": {
                        lat: 41.814637,
                        lng: -87.596083
                    }
                }
            }]
        }


        await act(async () => { render(<App coordinate={coordinate} />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({
                results: [{
                    icon: "jo",
                    icon_background_colour: "jo",
                    name: "Prushorth Prushorth",
                    opening_hours: {
                        open_now: true
                    },
                    photos: [{
                        height: 90,
                        photo_reference: "jo",
                        width: 80
                    }],
                    price_level: 9,
                    rating: 9,
                    user_ratings_total: 90,
                    vicinity: "ko"
                }]


            },
            ),

        } as any)
        
        const maxPriceLevel = screen.getByTestId("Input Max Price Level") as HTMLSelectElement
        await act(async()=>{fireEvent.mouseDown(screen.getAllByRole('button')[4])});
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/3/i))});
        expect(maxPriceLevel.value).toBe("3")
        screen.debug(undefined, 100000)
    });


    it("should be able to see update to cards when change filter of min price", async () => {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({
                results: [{
                    icon: "jo",
                    icon_background_colour: "jo",
                    name: "Prushorth Prushti",
                    opening_hours: {
                        open_now: true
                    },
                    photos: [{
                        height: 90,
                        photo_reference: "jo",
                        width: 80
                    }],
                    price_level: 9,
                    rating: 9,
                    user_ratings_total: 90,
                    vicinity: "ko"
                }]


            },
            ),

        } as any)

        let coordinate = {
            "results": [{
                "geometry": {
                    "location": {
                        lat: 41.814637,
                        lng: -87.596083
                    }
                }
            }]
        }


        await act(async () => { render(<App coordinate={coordinate} />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({
                results: [{
                    icon: "jo",
                    icon_background_colour: "jo",
                    name: "Prushorth Prushorth",
                    opening_hours: {
                        open_now: true
                    },
                    photos: [{
                        height: 90,
                        photo_reference: "jo",
                        width: 80
                    }],
                    price_level: 9,
                    rating: 9,
                    user_ratings_total: 90,
                    vicinity: "ko"
                }]


            },
            ),

        } as any)

        const minPriceLevel = screen.getByTestId("Input Min Price Level") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[3]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/1/i)) });
        expect(minPriceLevel.value).toBe("1")
        screen.debug(undefined, 100000)
    });
});

