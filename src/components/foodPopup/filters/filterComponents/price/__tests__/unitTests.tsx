import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup,within, getByTestId } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import {MaxPriceFilter} from '../maxPriceFilter'
import {MinPriceFilter} from '../MinPriceFilter'
import App, { TopicContext } from '../../../../../../popup/popup'
import { APIContext } from '../../../filters'
import {APIInput} from '../../../apiInput'
import UserEvent from '@testing-library/user-event'

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

    it("should show the max filter to user ", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <MaxPriceFilter /></APIContext.Provider>)

        const maxPriceLevel = screen.getByTestId("Max Price Level") as HTMLSelectElement

        expect(maxPriceLevel).toBeVisible()
    });

    it("should show the min filter to user ", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <MinPriceFilter /></APIContext.Provider>)

        const minPriceLevel = screen.getByTestId("Min Price Level") as HTMLSelectElement

        expect(minPriceLevel).toBeVisible()
    });
});

describe("UI values", () => {

    it("should show the value of max filter to user", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <MaxPriceFilter /></APIContext.Provider>)

        const maxPriceLevel = screen.getByTestId("Input Max Price Level") as HTMLInputElement

        expect(maxPriceLevel.value).toBe("4")
    });

    it("should show the value of min filter to user ", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <MinPriceFilter /></APIContext.Provider>)

        const minPriceLevel = screen.getByTestId("Input Min Price Level") as HTMLInputElement

        expect(minPriceLevel.value).toBe("0")
    });
});


describe("Event test change value of filter", () => {

    it("should change from 4 to 3 ", () => {
        const { getByTestId, getAllByRole } = render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const maxPriceLevel = screen.getByTestId("Input Max Price Level") as HTMLSelectElement
        fireEvent.mouseDown(getAllByRole('button')[3]);
        //expect(maxPriceLevel).toBeInTheDocument()
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/3/i));
        expect(maxPriceLevel.value).toBe("3")
    });

    it("should change from 4 to 3 to 4", () => {
        const { getByTestId, getAllByRole } = render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const maxPriceLevel = screen.getByTestId("Input Max Price Level") as HTMLSelectElement
        fireEvent.mouseDown(getAllByRole('button')[3]);
        //expect(maxPriceLevel).toBeInTheDocument()
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/3/i));
        expect(maxPriceLevel.value).toBe("3")

        fireEvent.click(options.getByText(/4/i));
        expect(maxPriceLevel.value).toBe("4")
    });

    it("should change from 0 to 1 ", () => {
        const { getByTestId, getAllByRole } = render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const minPriceLevel = screen.getByTestId("Input Min Price Level") as HTMLSelectElement
        fireEvent.mouseDown(getAllByRole('button')[2]);
        //expect(maxPriceLevel).toBeInTheDocument()
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/1/i));
        expect(minPriceLevel.value).toBe("1")
    });

    it("should change from 0 to 1 to 0", () => {
        const { getByTestId, getAllByRole } = render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const minPriceLevel = screen.getByTestId("Input Min Price Level") as HTMLSelectElement
        fireEvent.mouseDown(getAllByRole('button')[2]);
        //expect(maxPriceLevel).toBeInTheDocument()
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/1/i));
        expect(minPriceLevel.value).toBe("1")

        fireEvent.click(options.getByText(/0/i));
        expect(minPriceLevel.value).toBe("0")
    });


});