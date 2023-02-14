import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import FoodPopup from "../../foodPopup";
import { TopicContext } from '../../../../popup/popup'


describe("FoodPopup card UI in document", () => {
    // 1. IS (<TEXT>)OFELE IN DOM,
    it("should show the card in doc", () => {
        // 2. render
        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const card = screen.getByTestId("result card other") 

        expect(card).toBeInTheDocument()
    });
    
   
});

describe("FoodPopup card UI is visible to user", () => {
    // 1. IS (<TEXT>)OFELE IN DOM,
    it("should show the card in doc", () => {
        // 2. render
        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const card = screen.getByTestId("result card other") 
        expect(card).toBeVisible()
    });

    
});

describe("FoodPopup card UI value", () => {
    it("should show the card in doc", () => {
        // 2. render
        render((<TopicContext.Provider value={["Food", jest.fn()]}> <FoodPopup /></TopicContext.Provider>))

        const card = screen.getByTestId("result card other") as HTMLParagraphElement

        expect(card.innerHTML).toBe("Loading. Please wait while we collect your results")
    });
});