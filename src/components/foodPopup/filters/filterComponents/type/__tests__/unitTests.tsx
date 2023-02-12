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
    });

});

describe("Filters UI in doc", () => {

    it("should render type Filter ", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <TypeFilter /></APIContext.Provider>)

        const type = screen.getByTestId("Type") as HTMLSelectElement

        expect(type).toBeInTheDocument()
    });

});

describe("Filters UI visible", () => {

    it("should show the type filter to user ", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <TypeFilter /></APIContext.Provider>)

        const type = screen.getByTestId("Type") as HTMLSelectElement

        expect(type).toBeVisible()
    });

});

describe("UI values", () => {

    it("should show the value of type filter to user", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <TypeFilter /></APIContext.Provider>)

        const type = screen.getByTestId("Input Type") as HTMLInputElement

        expect(type.value).toBe("Bakery")
    });

});


describe("Event test change value of filter", () => {

    it("should change from 1500 to 1000 ", () => {
        const { getByTestId, getAllByRole } = render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        fireEvent.mouseDown(getAllByRole('button')[1]);
        //expect(maxPriceLevel).toBeInTheDocument()
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/Cafe/i));
        expect(type.value).toBe("Cafe")
    });

    it("should change from 1500 to 1000 to 1500", () => {
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