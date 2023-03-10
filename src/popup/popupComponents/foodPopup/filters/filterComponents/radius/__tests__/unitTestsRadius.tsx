import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import {  screen, render, fireEvent,within  } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import { RadiusFilter } from '../radiusFilter'
import { TopicContext } from '../../../../../../popup'
import { APIContext } from '../../../filters'
import { APIInput } from '../../../../../../../api/food/apiInput'

describe("Components Render", () => {

    it("should render Radius Filter ", () => {
        render(<APIContext.Provider value={[new APIInput()]}> <RadiusFilter /></APIContext.Provider>)
        const radius = screen.getByTestId("Radius") as HTMLSelectElement

        expect(radius).toBeInTheDocument()
        expect(radius).toBeVisible()
        
        const radiusIn = screen.getByTestId("Input Radius") as HTMLInputElement

        expect(radiusIn.value).toBe("1500")
    });

});


describe("Event test change value of filter", () => {

    it("should change from 1500 to 1000 ", () => {
        const { getByTestId, getAllByRole } = render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const radius = screen.getByTestId("Input Radius") as HTMLSelectElement
        fireEvent.mouseDown(getAllByRole('button')[0]);
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/1000/i));
        expect(radius.value).toBe("1000")
    });

    it("should change from 1500 to 1000 to 1500", () => {
        const { getByTestId, getAllByRole } = render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const radius = screen.getByTestId("Input Radius") as HTMLSelectElement
        fireEvent.mouseDown(getAllByRole('button')[0]);
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/1000/i));
        expect(radius.value).toBe("1000")

        fireEvent.click(options.getByText(/1500/i));
        expect(radius.value).toBe("1500")
    });




});