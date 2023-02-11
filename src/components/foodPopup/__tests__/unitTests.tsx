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

describe("FoodPopup UI in document", () => {
    // 1. IS (<TEXT>)OFELE IN DOM,
    it("should show the radius filter in doc", () => {
        // 2. render
        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const radiusFilter = screen.getByTestId("Radius") as HTMLSelectElement

        expect(radiusFilter).toBeInTheDocument()
    });

    it("should show the type filter value", () => {
        // 2. render
        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const typeFilter = screen.getByTestId("Type") as HTMLSelectElement

        expect(typeFilter).toBeInTheDocument()
    });

    it("should show the Min Price Level filter value", () => {
        // 2. render
        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const minPriceLevel = screen.getByTestId("Min Price Level") as HTMLSelectElement

        expect(minPriceLevel).toBeInTheDocument()
    });

    it("should show the Max Price Level filter value", () => {
        // 2. render
        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const maxPriceLevel = screen.getByTestId("Max Price Level") as HTMLSelectElement

        expect(maxPriceLevel).toBeInTheDocument()
    });

    // it("should show the cards", () => {
    //     // 2. render
    //     render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

    //     const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

    //     expect(topicMenuSelect.value).toBe("Food")
    // });
});

describe("FoodPopup UI is visible to user", () => {
    // 1. IS (<TEXT>)OFELE IN DOM,
    it("should show the radius filter in doc", () => {
        // 2. render
        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const radiusFilter = screen.getByTestId("Radius") as HTMLSelectElement

        expect(radiusFilter).toBeVisible()
    });

    it("should show the type filter value", () => {
        // 2. render
        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const typeFilter = screen.getByTestId("Type") as HTMLSelectElement

        expect(typeFilter).toBeVisible()
    });

    it("should show the Min Price Level filter value", () => {
        // 2. render
        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const minPriceLevel = screen.getByTestId("Min Price Level") as HTMLSelectElement

        expect(minPriceLevel).toBeVisible()
    });

    it("should show the Max Price Level filter value", () => {
        // 2. render
        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const maxPriceLevel = screen.getByTestId("Max Price Level") as HTMLSelectElement

        expect(maxPriceLevel).toBeVisible()
    });

    // it("should show the cards", () => {
    //     // 2. render
    //     render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

    //     const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

    //     expect(topicMenuSelect.value).toBe("Food")
    // });
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

