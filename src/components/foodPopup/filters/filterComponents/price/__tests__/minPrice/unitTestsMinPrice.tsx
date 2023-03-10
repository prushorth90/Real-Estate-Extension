import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { screen, render, fireEvent, within } from "@testing-library/react";
import FoodPopup from "../../../../../foodPopup";
import { MinPriceFilter } from '../../MinPriceFilter'
import { TopicContext } from '../../../../../../../popup/popup'
import { APIContext } from '../../../../filters'
import { APIInput } from '../../../../../../../api/food/apiInput'

describe("for when the max price component renders", () => {

    it("should render Max Price Filter ", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <MinPriceFilter /></APIContext.Provider>)

        const minPriceLevel = screen.getByTestId("Min Price Level") as HTMLSelectElement
        const minPriceIn = screen.getByTestId("Input Min Price Level") as HTMLInputElement

        expect(minPriceIn.value).toBe("0")
        expect(minPriceLevel).toBeInTheDocument()
        expect(minPriceLevel).toBeVisible()

    });

});


describe("change event for the value of filter", () => {

    it("should change from 0 to 1 ", () => {
        const { getByTestId, getAllByRole } = render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))
        const minPriceLevel = screen.getByTestId("Input Min Price Level") as HTMLSelectElement
        fireEvent.mouseDown(getAllByRole('button')[2]);
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/1/i));
        expect(minPriceLevel.value).toBe("1")
    });

    it("should change from 0 to 1 to 0", () => {
        
        const { getByTestId, getAllByRole } = render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))
        const minPriceLevel = screen.getByTestId("Input Min Price Level") as HTMLSelectElement
        fireEvent.mouseDown(getAllByRole('button')[2]);
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/1/i));
        expect(minPriceLevel.value).toBe("1")

        fireEvent.click(options.getByText(/0/i));
        expect(minPriceLevel.value).toBe("0")
    });

});


