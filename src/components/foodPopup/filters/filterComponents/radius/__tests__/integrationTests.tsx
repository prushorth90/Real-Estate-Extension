import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import { RadiusFilter } from '../radiusFilter'
import App, { TopicContext } from '../../../../../../popup/popup'
import { APIContext } from '../../../filters'
import { APIInput } from '../../../apiInput'
import { InputLabel } from '@material-ui/core';


describe("Event test change value of radius filter", () => {

    global.fetch = jest.fn()
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>
    it("should be able to see update of value filter of radius", async () => {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({
                results: [{
                    name: "Bakery 1",
                    price_level: 0,
                    rating: 2,
                    user_ratings_total: 56,
                    vicinity: "Fake address 1"
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
                    name: "Fake Bakery",
                    price_level: 3,
                    rating: 5,
                    user_ratings_total: 90,
                    vicinity: "Fake address"
                }]


            },
            ),

        } as any)

        const radius = screen.getByTestId("Input Radius") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[1]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/1000/i)) });
        expect(radius.value).toBe("1000")
    });

    it("should be able to see card when change filter of radius", async () => {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({
                results: [{
                    name: "Bakery 1",
                    price_level: 0,
                    rating: 2,
                    user_ratings_total: 56,
                    vicinity: "Fake address 1"
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
                    name: "Fake Bakery",
                    price_level: 3,
                    rating: 5,
                    user_ratings_total: 90,
                    vicinity: "Fake address"
                }]
            },
            ),

        } as any)

        const radius = screen.getByTestId("Input Radius") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[1]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/1000/i)) });

        const card = await screen.findByTestId("result card") as HTMLDivElement
        expect(card).toBeVisible()


    });

    
    it("should be able to see update to cards values when change filter of radius", async () => {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({
                results: [{
                    name: "Bakery 1",
                    price_level: 0,
                    rating: 2,
                    user_ratings_total: 56,
                    vicinity: "Fake address 1"
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
                    name: "Fake Bakery",
                    price_level: 3,
                    rating: 5,
                    user_ratings_total: 90,
                    vicinity: "Fake address"
                }]
            },
            ),

        } as any)

        const mradius = screen.getByTestId("Input Radius") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[4]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/3/i)) });

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

   
});

