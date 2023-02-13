import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import { Result } from '../result'
import App, { TopicContext } from '../../../../../../popup/popup'
//import { APIContext } from '../../../filters'
//import { APIInput } from '../../../apiInput'
import UserEvent from '@testing-library/user-event'

describe("Components Render", () => {

    it("should render result card success", () => {
        let res = {
            name: "Fake Bakery",
            price_level: 3,
            rating: 5,
            user_ratings_total: 90,
            vicinity: "Fake address"
        }

        render(<Result result={res} />)
    });

    

});

describe("Card UI in doc", () => {

    it("should render card in document ", () => {
        let res = {
            name: "Fake Bakery",
            price_level: 3,
            rating: 5,
            user_ratings_total: 90,
            vicinity: "Fake address"
        }

        render(<Result result={res} />)

        const card = screen.getByTestId("result card") 

        expect(card).toBeInTheDocument()
    });

});

describe("Card UI visible", () => {

    it("should show the card to user ", () => {
        let res = {
            name: "Fake Bakery",
            price_level: 3,
            rating: 5,
            user_ratings_total: 90,
            vicinity: "Fake address"
        }

        render(<Result result={res} />)

        const card = screen.getByTestId("result card")

        expect(card).toBeVisible()
    });

});

describe("card UI values", () => {

    it("should show the values of result card success", async () => {

        let res = {
            name: "Fake Bakery",
            price_level: 3,
            rating: 5,
            user_ratings_total: 90,
            vicinity: "Fake address"
        }
        render(<Result result={res} />)
        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake Bakery ")

    })

});

describe("card UI values", () => {

    it("should show the values of result card success", async () => {

        let res = {
            name:undefined,
            price_level: undefined,
            rating: undefined,
            user_ratings_total: undefined,
            vicinity: undefined
        }
        render(<Result result={res} />)
        const name = await screen.findByTestId("result card") as HTMLParagraphElement
        expect(name.innerHTML).toBe("")

    })

});
