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

        screen.debug(undefined, 100000)
    });

   
});

