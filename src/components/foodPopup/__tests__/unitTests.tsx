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

