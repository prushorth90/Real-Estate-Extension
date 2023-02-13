import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import App, { TopicContext } from '../../../../../../popup/popup'

global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

describe("Event test click photo button", () => {
    
    it("should be able to see photo dialog after click photo button", async () => {
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
                    url:"fake url"
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

        const photoButton = screen.getByTestId("photo button") as HTMLButtonElement

        await act(async () => { fireEvent.click(photoButton) });
        const foodPhoto = screen.getByTestId("food photo none") as HTMLImageElement

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()
    });

});
