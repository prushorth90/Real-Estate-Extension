import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import { TypeFilter } from '../typeFilter'
import App, { TopicContext } from '../../../../../../popup/popup'
import { APIContext } from '../../../filters'
import { APIInput } from '../../../apiInput'
import UserEvent from '@testing-library/user-event'

describe("Components Render", () => {

    it("should render type Filter ", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <TypeFilter /></APIContext.Provider>)
        const type = screen.getByTestId("Type") as HTMLSelectElement

        expect(type).toBeInTheDocument()
        expect(type).toBeVisible()
        const typeIn = screen.getByTestId("Input Type") as HTMLInputElement
        expect(typeIn.value).toBe("Bakery")

    });

});

describe("change value of type filter", () => {

    it("should change from bakery to cafe ", () => {
        const { getByTestId, getAllByRole } = render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        fireEvent.mouseDown(getAllByRole('button')[1]);
        //expect(maxPriceLevel).toBeInTheDocument()
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/Cafe/i));
        expect(type.value).toBe("Cafe")
    });

    it("should change from bakery to cafe to bakery", () => {
        const { getByTestId, getAllByRole } = render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        fireEvent.mouseDown(getAllByRole('button')[1]);
        //expect(maxPriceLevel).toBeInTheDocument()
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/Cafe/i));
        expect(type.value).toBe("Cafe")

        fireEvent.click(options.getByText(/Bakery/i));
        expect(type.value).toBe("Bakery")
    });




});