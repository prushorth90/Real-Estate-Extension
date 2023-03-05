import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import {  screen, render  } from "@testing-library/react";
import { Result } from '../result'


describe("for when the components render", () => {

    it("should show the result card", async () => {
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
        expect(card).toBeVisible()

        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake Bakery ")

        const priceLevel = await screen.findByTestId("result price level") as HTMLParagraphElement
        expect(priceLevel.innerHTML).toBe("Price Level: 3")

        const rating = screen.queryByTestId("result rating")
        expect(rating).toBeInTheDocument()

        const userRatingsTotal = await screen.findByTestId("result user rating total") as HTMLParagraphElement
        expect(userRatingsTotal.innerHTML).toBe("Total User Ratings: 90 ")

        const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
        expect(vicinity.innerHTML).toBe(" Vicinity: Fake address ")

    });

    it("should show no result on the card", async () => {

        let res = {
            name: undefined,
            price_level: undefined,
            rating: undefined,
            user_ratings_total: undefined,
            vicinity: undefined
        }
        render(<Result result={res} />)
        const name = screen.queryByTestId("result name")
        expect(name).not.toBeInTheDocument()

        const priceLevel = screen.queryByTestId("result price level")
        expect(priceLevel).not.toBeInTheDocument()

        const rating = screen.queryByTestId("result rating")
        expect(rating).not.toBeInTheDocument()

        const userRatingsTotal = screen.queryByTestId("result user rating total")
        expect(userRatingsTotal).not.toBeInTheDocument()

        const vicinity  = screen.queryByTestId("result vicinity")
        expect(vicinity).not.toBeInTheDocument()

    })

    it("should show name only on card", async () => {

        let res = {
            name: "Fake restaurant",
            price_level: undefined,
            rating: undefined,
            user_ratings_total: undefined,
            vicinity: undefined
        }
        render(<Result result={res} />)
        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake restaurant ")

        const priceLevel = screen.queryByTestId("result price level")
        expect(priceLevel).not.toBeInTheDocument()

        const rating = screen.queryByTestId("result rating")
        expect(rating).not.toBeInTheDocument()

        const userRatingsTotal = screen.queryByTestId("result user rating total")
        expect(userRatingsTotal).not.toBeInTheDocument()

        const vicinity = screen.queryByTestId("result vicinity")
        expect(vicinity).not.toBeInTheDocument()


    })

    it("should show (name, price level) on card", async () => {

        let res = {
            name: "Fake restaurant",
            price_level: 3,
            rating: undefined,
            user_ratings_total: undefined,
            vicinity: undefined
        }
        render(<Result result={res} />)
        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake restaurant ")

        const priceLevel = await screen.findByTestId("result price level") as HTMLParagraphElement
        expect(priceLevel.innerHTML).toBe("Price Level: 3")

        const rating = screen.queryByTestId("result rating")
        expect(rating).not.toBeInTheDocument()

        const userRatingsTotal = screen.queryByTestId("result user rating total")
        expect(userRatingsTotal).not.toBeInTheDocument()

        const vicinity = screen.queryByTestId("result vicinity")
        expect(vicinity).not.toBeInTheDocument()

    })

    it("should show (name price level,rating) on card", async () => {

        let res = {
            name: "Fake restaurant",
            price_level: 3,
            rating: 1,
            user_ratings_total: undefined,
            vicinity: undefined
        }
        render(<Result result={res} />)
        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake restaurant ")

        const priceLevel = await screen.findByTestId("result price level") as HTMLParagraphElement
        expect(priceLevel.innerHTML).toBe("Price Level: 3")

        const rating = screen.queryByTestId("result rating")
        expect(rating).toBeInTheDocument()

        const userRatingsTotal = screen.queryByTestId("result user rating total")
        expect(userRatingsTotal).not.toBeInTheDocument()

        const vicinity = screen.queryByTestId("result vicinity")
        expect(vicinity).not.toBeInTheDocument()

    })

    it("should show (name price level rating, user ratings total) on card", async () => {

        let res = {
            name: "Fake restaurant",
            price_level: 3,
            rating: 1,
            user_ratings_total: 90,
            vicinity: undefined
        }
        render(<Result result={res} />)
        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake restaurant ")

        const priceLevel = await screen.findByTestId("result price level") as HTMLParagraphElement
        expect(priceLevel.innerHTML).toBe("Price Level: 3")

        const rating = screen.queryByTestId("result rating")
        expect(rating).toBeInTheDocument()

        const userRatingsTotal = await screen.findByTestId("result user rating total") as HTMLParagraphElement
        expect(userRatingsTotal.innerHTML).toBe("Total User Ratings: 90 ")


        const vicinity = screen.queryByTestId("result vicinity")
        expect(vicinity).not.toBeInTheDocument()

    })

    it("should show (price level rating and user ratings total, vicinity) on card", async () => {

        let res = {
            name: undefined,
            price_level: 3,
            rating: 1,
            user_ratings_total: 90,
            vicinity: "Fake address"
        }
        render(<Result result={res} />)
        const name = screen.queryByTestId("result name")
        expect(name).not.toBeInTheDocument()

        const priceLevel = await screen.findByTestId("result price level") as HTMLParagraphElement
        expect(priceLevel.innerHTML).toBe("Price Level: 3")

        const rating = screen.queryByTestId("result rating")
        expect(rating).toBeInTheDocument()

        const userRatingsTotal = await screen.findByTestId("result user rating total") as HTMLParagraphElement
        expect(userRatingsTotal.innerHTML).toBe("Total User Ratings: 90 ")


        const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
        expect(vicinity.innerHTML).toBe(" Vicinity: Fake address ")

    })

    it("should show (rating user ratings total vicinity) on card", async () => {

        let res = {
            name: undefined,
            price_level: undefined,
            rating: 1,
            user_ratings_total: 90,
            vicinity: "Fake address"
        }
        render(<Result result={res} />)
        const name = screen.queryByTestId("result name")
        expect(name).not.toBeInTheDocument()

        const priceLevel = screen.queryByTestId("result price level")
        expect(priceLevel).not.toBeInTheDocument()

        const rating = screen.queryByTestId("result rating")
        expect(rating).toBeInTheDocument()

        const userRatingsTotal = await screen.findByTestId("result user rating total") as HTMLParagraphElement
        expect(userRatingsTotal.innerHTML).toBe("Total User Ratings: 90 ")


        const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
        expect(vicinity.innerHTML).toBe(" Vicinity: Fake address ")

    })

    it("should show (user ratings total, vicinity) on card", async () => {

        let res = {
            name: undefined,
            price_level: undefined,
            rating: undefined,
            user_ratings_total: 90,
            vicinity: "Fake address"
        }
        render(<Result result={res} />)
        const name = screen.queryByTestId("result name")
        expect(name).not.toBeInTheDocument()

        const priceLevel = screen.queryByTestId("result price level")
        expect(priceLevel).not.toBeInTheDocument()

        const rating = screen.queryByTestId("result rating")
        expect(rating).not.toBeInTheDocument()

        const userRatingsTotal = await screen.findByTestId("result user rating total") as HTMLParagraphElement
        expect(userRatingsTotal.innerHTML).toBe("Total User Ratings: 90 ")


        const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
        expect(vicinity.innerHTML).toBe(" Vicinity: Fake address ")

    })

    it("should show vicinity on card", async () => {

        let res = {
            name: undefined,
            price_level: undefined,
            rating: undefined,
            user_ratings_total: undefined,
            vicinity: "Fake address"
        }
        render(<Result result={res} />)
        const name = screen.queryByTestId("result name")
        expect(name).not.toBeInTheDocument()

        const priceLevel = screen.queryByTestId("result price level")
        expect(priceLevel).not.toBeInTheDocument()

        const rating = screen.queryByTestId("result rating")
        expect(rating).not.toBeInTheDocument()

        const userRatingsTotal = screen.queryByTestId("result user rating total")
        expect(userRatingsTotal).not.toBeInTheDocument()

        const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
        expect(vicinity.innerHTML).toBe(" Vicinity: Fake address ")

    })

    it("should show (name, vicinity) on card", async () => {

        let res = {
            name: "Fake Bakery",
            price_level: undefined,
            rating: undefined,
            user_ratings_total: undefined,
            vicinity: "Fake address"
        }
        render(<Result result={res} />)
        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake Bakery ")

        const priceLevel = screen.queryByTestId("result price level")
        expect(priceLevel).not.toBeInTheDocument()

        const rating = screen.queryByTestId("result rating")
        expect(rating).not.toBeInTheDocument()

        const userRatingsTotal = screen.queryByTestId("result user rating total")
        expect(userRatingsTotal).not.toBeInTheDocument()

        const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
        expect(vicinity.innerHTML).toBe(" Vicinity: Fake address ")

    })


    it("should show (name, rating, vicinity) on card", async () => {

        let res = {
            name: "Fake Bakery",
            price_level: undefined,
            rating: 1,
            user_ratings_total: undefined,
            vicinity: "Fake address"
        }
        render(<Result result={res} />)
        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake Bakery ")

        const priceLevel = screen.queryByTestId("result price level")
        expect(priceLevel).not.toBeInTheDocument()

        const rating = screen.queryByTestId("result rating")
        expect(rating).toBeInTheDocument()

        const userRatingsTotal = screen.queryByTestId("result user rating total")
        expect(userRatingsTotal).not.toBeInTheDocument()

        const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
        expect(vicinity.innerHTML).toBe(" Vicinity: Fake address ")

    })

});

