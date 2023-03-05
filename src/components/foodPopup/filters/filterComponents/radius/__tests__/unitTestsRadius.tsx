import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup, within, getByTestId } from "@testing-library/react";
import FoodPopup from "../../../../foodPopup";
import { RadiusFilter } from '../radiusFilter'
import App, { TopicContext } from '../../../../../../popup/popup'
import { APIContext } from '../../../filters'
import { APIInput } from '../../../apiInput'
import UserEvent from '@testing-library/user-event'

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
        //expect(maxPriceLevel).toBeInTheDocument()
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/1000/i));
        expect(radius.value).toBe("1000")
    });

    it("should change from 1500 to 1000 to 1500", () => {
        const { getByTestId, getAllByRole } = render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const radius = screen.getByTestId("Input Radius") as HTMLSelectElement
        fireEvent.mouseDown(getAllByRole('button')[0]);
        //expect(maxPriceLevel).toBeInTheDocument()
        const options = within(screen.getByRole('listbox'));
        fireEvent.click(options.getByText(/1000/i));
        expect(radius.value).toBe("1000")

        fireEvent.click(options.getByText(/1500/i));
        expect(radius.value).toBe("1500")
    });




});