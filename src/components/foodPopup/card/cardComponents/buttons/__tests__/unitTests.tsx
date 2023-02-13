import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import { PhotoButton } from '../photo'
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

        render(<PhotoButton result={res} index={1}/>)
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

        render(<PhotoButton result={res} index={1} />)

        const photoButton = screen.getByTestId("photo button")

        expect(photoButton).toBeInTheDocument()
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

        render(<PhotoButton result={res} index={1} />)


        const photoButton = screen.getByTestId("photo button")

        expect(photoButton).toBeVisible()
    });

});


