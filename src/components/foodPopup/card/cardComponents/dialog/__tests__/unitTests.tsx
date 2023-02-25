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
        this.url=url

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

describe("for when the dialog renders", () => {
    
    it("should render result dialog success", async () => {
        mockGoodPhotoAPI()
        await act(async () => {render(<PhotoDialog open={true} onClose={jest.fn()} photo_reference={"fake photo reference"} />)})
        const foodPhoto = await screen.findByTestId("food photo")

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()
    });
    

    it("should render dialog in document even if error ", async () => {
        mockBadInvalidPhotoAPI()

        await act(async () => { render(<PhotoDialog open={true} onClose={jest.fn()} photo_reference={undefined} />) })

        const foodPhoto = await screen.findByTestId("food photo error") as HTMLDivElement

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()
        expect(foodPhoto.innerHTML).toBe("Error. Our API request has failed ")



    });

    it("should render dialog in document even if empty ", async () => {
        mockBadEmptyPhotoAPI()

        await act(async () => { render(<PhotoDialog open={true} onClose={jest.fn()} photo_reference={""} />) })

        const foodPhoto = await screen.findByTestId("food photo none")

        expect(foodPhoto).toBeInTheDocument()
        expect(foodPhoto).toBeVisible()
        expect(foodPhoto.innerHTML).toBe(" No Photo ")

    });
    
    it("should not render dialog in document as open false", async () => {
        mockGoodPhotoAPI()

        await act(async () => { render(<PhotoDialog open={false} onClose={jest.fn()} photo_reference={""} />) })

        const foodPhoto = await screen.queryByTestId("food photo none")

        expect(foodPhoto).not.toBeInTheDocument()

    });

    it("should not render dialog in document as open false with bad empty photo api", async () => {
        mockBadEmptyPhotoAPI()

        await act(async () => { render(<PhotoDialog open={false} onClose={jest.fn()} photo_reference={""} />) })

        const foodPhoto = await screen.queryByTestId("food photo none")

        expect(foodPhoto).not.toBeInTheDocument()

    });

    it("should not render dialog in document as open false with bad invalid photo api", async () => {
        mockBadInvalidPhotoAPI()

        await act(async () => { render(<PhotoDialog open={false} onClose={jest.fn()} photo_reference={""} />) })

        const foodPhoto = await screen.queryByTestId("food photo none")

        expect(foodPhoto).not.toBeInTheDocument()

    });


    
  

});





