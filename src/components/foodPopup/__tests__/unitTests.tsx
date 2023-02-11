import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import FoodPopup from "../foodPopup";
import { TopicContext } from '../../../popup/popup'

describe("Components Render", () => {

    it("should render", () => {

        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

    });
});

describe("FoodPopup UI value", () => {
    // 1. IS (<TEXT>)OFELE IN DOM,
    it("should show the radius filter value", () => {
        // 2. render
        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const topicMenuSelect = screen.getByTestId("Input Radius") as HTMLInputElement

        expect(topicMenuSelect.value).toBe("1500")
    });

    it("should show the type filter value", () => {
        // 2. render
        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const topicMenuSelect = screen.getByTestId("Input Type") as HTMLInputElement

        expect(topicMenuSelect.value).toBe("Bakery")
    });

    it("should show the Min Price Level filter value", () => {
        // 2. render
        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const topicMenuSelect = screen.getByTestId("Input Min Price Level") as HTMLInputElement

        expect(topicMenuSelect.value).toBe("0")
    });

    it("should show the Max Price Level filter value", () => {
            // 2. render
            render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

            const topicMenuSelect = screen.getByTestId("Input Max Price Level") as HTMLInputElement

            expect(topicMenuSelect.value).toBe("4")
        });

    // it("should show the cards", () => {
    //     // 2. render
    //     render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

    //     const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

    //     expect(topicMenuSelect.value).toBe("Food")
    // });
});

