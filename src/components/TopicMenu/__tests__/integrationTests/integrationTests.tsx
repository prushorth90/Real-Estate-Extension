import React from 'react'
import ReactDOM from 'react-dom'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { TopicMenu } from "../../topicMenu";
import { App } from "../../../../popup";
import { TopicContext } from '../../../../popup/popup'

describe("Integration Test: ", () => {

    global.fetch = jest.fn()
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>
    it("should be able to see cards when change topic to food", async () => {
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

        let coordinate = {
            "results": [{
                "geometry":{
                    "location":{
                        lat:41.814637,
                        lng:-87.596083
                    }
                }
            }]
        }


        await act(async () => {render(<App coordinate={coordinate}/>)})

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake Bakery ")

        const totalUserRating = await screen.findByTestId("result user rating total") as HTMLParagraphElement
        expect(totalUserRating.innerHTML).toBe("Total User Ratings: 90 ")

        const priceLevel = await screen.findByTestId("result price level") as HTMLParagraphElement
        expect(priceLevel.innerHTML).toBe("Price Level: 3")

        const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
        expect(vicinity.innerHTML).toBe(" Vicinity: Fake address ")

    });

   
});

