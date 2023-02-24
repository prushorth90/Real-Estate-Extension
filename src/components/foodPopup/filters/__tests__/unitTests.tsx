import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import FoodPopup from "../../foodPopup";
import { TopicContext } from '../../../../popup/popup'


describe("for when the food filters have been rendered", () => {

    it("should show the radius filter in doc", async () => {

        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const radiusFilter = await screen.findByTestId("Radius") as HTMLSelectElement

        expect(radiusFilter).toBeInTheDocument()
        expect(radiusFilter).toBeVisible()

    });

    it("should show the type filter value", () => {

        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const typeFilter = screen.getByTestId("Type") as HTMLSelectElement

        expect(typeFilter).toBeInTheDocument()
        expect(typeFilter).toBeVisible()


    });

    it("should show the Min Price Level filter value", () => {

        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const minPriceLevel = screen.getByTestId("Min Price Level") as HTMLSelectElement

        expect(minPriceLevel).toBeInTheDocument()
        expect(minPriceLevel).toBeVisible()


    });

    it("should show the Max Price Level filter value", () => {

        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const maxPriceLevel = screen.getByTestId("Max Price Level") as HTMLSelectElement

        expect(maxPriceLevel).toBeInTheDocument()
        expect(maxPriceLevel).toBeVisible()

    });



});
// describe("for when the filters have been rendered", () => {

//     it("should show the radius filter in doc", () => {

//         render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

//         const radiusFilter = screen.getByTestId("Radius") as HTMLSelectElement

//         expect(radiusFilter).toBeInTheDocument()
//         expect(radiusFilter).toBeVisible()


//     });

//     it("should show the type filter value", () => {

//         render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

//         const typeFilter = screen.getByTestId("Type") as HTMLSelectElement

//         expect(typeFilter).toBeInTheDocument()
//         expect(typeFilter).toBeVisible()


//     });

//     it("should show the Min Price Level filter value", () => {

//         render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

//         const minPriceLevel = screen.getByTestId("Min Price Level") as HTMLSelectElement

//         expect(minPriceLevel).toBeInTheDocument()
//         expect(minPriceLevel).toBeVisible()


//     });

//     it("should show the Max Price Level filter value", () => {

//         render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

//         const maxPriceLevel = screen.getByTestId("Max Price Level") as HTMLSelectElement

//         expect(maxPriceLevel).toBeInTheDocument()
//         expect(maxPriceLevel).toBeVisible()

//     });



// });


