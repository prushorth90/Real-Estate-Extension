import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import FoodPopup from "../../../../../foodPopup";
import { MaxPriceFilter } from '../../maxPriceFilter'
import { MinPriceFilter } from '../../MinPriceFilter'
import App, { TopicContext } from '../../../../../../../popup/popup'
import { APIContext } from '../../../../filters'
import { APIInput } from '../../../../apiInput'
import UserEvent from '@testing-library/user-event'

describe("for when the max price component renders", () => {

    it("should render Max Price Filter ", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <MaxPriceFilter /></APIContext.Provider>)

        const maxPriceLevel = screen.getByTestId("Max Price Level") as HTMLSelectElement
        const maxPriceIn = screen.getByTestId("Input Max Price Level") as HTMLInputElement

        expect(maxPriceIn.value).toBe("4")
        expect(maxPriceLevel).toBeInTheDocument()
        expect(maxPriceLevel).toBeVisible()

    });

});


describe("change event for the value of filter", () => {

    it("should change from 4 to 3 ", () => {
        const { getByTestId, getAllByRole } = render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))
        const maxPriceLevel = screen.getByTestId("Input Max Price Level") as HTMLSelectElement
        fireEvent.mouseDown(getAllByRole('button')[3]);
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/3/i));
        expect(maxPriceLevel.value).toBe("3")
    });

    it("should change from 4 to 3 to 4", () => {
        const { getByTestId, getAllByRole } = render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const maxPriceLevel = screen.getByTestId("Input Max Price Level") as HTMLSelectElement
        fireEvent.mouseDown(getAllByRole('button')[3]);
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/3/i));
        expect(maxPriceLevel.value).toBe("3")

        fireEvent.click(options.getByText(/4/i));
        expect(maxPriceLevel.value).toBe("4")
    });

});


