import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import {MaxPriceFilter} from '../maxPriceFilter'
import {MinPriceFilter} from '../MinPriceFilter'
import { TopicContext } from '../../../../../../popup/popup'
import { APIContext } from '../../../filters'
import {APIInput} from '../../../apiInput'

describe("Components Render", () => {

    it("should render Max Price Filter ", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <MaxPriceFilter /></APIContext.Provider>)
    });

    it("should render Min Price Filter", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <MinPriceFilter /></APIContext.Provider>)
    });
});

describe("Filters UI in doc", () => {

    it("should render Max Price Filter ", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <MaxPriceFilter /></APIContext.Provider>)

        const maxPriceLevel = screen.getByTestId("Max Price Level") as HTMLSelectElement

        expect(maxPriceLevel).toBeInTheDocument()
    });

    it("should render Min Price Filter", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <MinPriceFilter /></APIContext.Provider>)
        
        const minPriceLevel = screen.getByTestId("Min Price Level") as HTMLSelectElement

        expect(minPriceLevel).toBeInTheDocument()
    });
});

describe("Filters UI visible", () => {

    it("should render Max Price Filter ", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <MaxPriceFilter /></APIContext.Provider>)

        const maxPriceLevel = screen.getByTestId("Max Price Level") as HTMLSelectElement

        expect(maxPriceLevel).toBeVisible()
    });

    it("should render Min Price Filter", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <MinPriceFilter /></APIContext.Provider>)

        const minPriceLevel = screen.getByTestId("Min Price Level") as HTMLSelectElement

        expect(minPriceLevel).toBeVisible()
    });
});

describe("UI values", () => {

    it("should render Max Price Filter ", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <MaxPriceFilter /></APIContext.Provider>)

        const maxPriceLevel = screen.getByTestId("Input Max Price Level") as HTMLInputElement

        expect(maxPriceLevel.value).toBe("4")
    });

    it("should render Min Price Filter", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <MinPriceFilter /></APIContext.Provider>)

        const minPriceLevel = screen.getByTestId("Input Min Price Level") as HTMLInputElement

        expect(minPriceLevel.value).toBe("0")
    });
});