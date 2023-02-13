import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import { PhotoDialog } from '../photoDialog'
import App, { TopicContext } from '../../../../../../popup/popup'
//import { APIContext } from '../../../filters'
//import { APIInput } from '../../../apiInput'
import UserEvent from '@testing-library/user-event'
import { chrome } from 'jest-chrome'

global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>


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
describe("Components Render", () => {
    
    it("should render result dialog success", async () => {
        mockNearbyPlacesAPI()
        await act(async () => {render(<PhotoDialog open={true} onClose={jest.fn()} photo_reference={"fake photo reference"} />)})
    });
    

    it("should render dialog in document ", async () => {
        mockNearbyPlacesAPI()

        await act(async () => { render(<PhotoDialog open={true} onClose={jest.fn()} photo_reference={"fake photo reference"} />) })

        const foodPhoto = await screen.findByTestId("food photo")

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()

    });
    
    
    // it("should be able to see close photo dialog", async () => {
    //     mockFetch.mockResolvedValue({
    //         json: () => Promise.resolve({
    //             results: [{
    //                 name: "Bakery 1",
    //                 price_level: 0,
    //                 rating: 2,
    //                 user_ratings_total: 56,
    //                 vicinity: "Fake address 1",
    //                 photos: [
    //                     {
    //                         height: 1840,
    //                         photo_reference: "fake photo reference",
    //                         width: 3264
    //                     }
    //                 ],
    //                 url: "fake url"
    //             }]


    //         },
    //         ),

    //     } as any)

    //     let coordinate = {
    //         "results": [{
    //             "geometry": {
    //                 "location": {
    //                     lat: 41.814637,
    //                     lng: -87.596083
    //                 }
    //             }
    //         }]
    //     }


    //     await act(async () => { render(<App coordinate={coordinate} />) })

    //     const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

    //     await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

    //     const photoButton = screen.getByTestId("photo button") as HTMLButtonElement
       
    //     await act(async () => { fireEvent.click(photoButton) });
        
    //     const backdrop = screen.getByRole('dialog', { hidden: true });
    //     await fireEvent.click(backdrop);
    //     screen.debug(undefined, 100000)
    // });


});





