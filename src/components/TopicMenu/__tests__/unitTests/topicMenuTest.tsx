import React from 'react'
import ReactDOM from 'react-dom'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import {TopicMenu} from "../../topicMenu";
import {App} from "../../../../popup";
import { TopicContext } from '../../../../popup/popup'

describe("Components Render", () => {
    // 1. IS (<TEXT>)OFELE IN DOM,
    it("should render Topic Menu", () => {
        // 2. render
        render((<TopicContext.Provider value={["Topics", jest.fn()]}> <TopicMenu /></TopicContext.Provider>))

    });
});



describe("Topic Select Menu UI", () => {

    it("should make topic select menu visible to user", () => {

        render((<TopicContext.Provider value={["Topics", jest.fn()]}> <TopicMenu /></TopicContext.Provider>))

        const topicMenuSelect = screen.getByTestId("topic_menu_select")

        expect(topicMenuSelect).toBeVisible()

    });

    it("should make topic select menu visible to user", () => {

        render((<TopicContext.Provider value={["Topics", jest.fn()]}> <TopicMenu /></TopicContext.Provider>))

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        expect(topicMenuSelect.value).toBe("Topics")

    });


    it("should have topic select menu be present in document", () => {

        render((<TopicContext.Provider value={["Topics", jest.fn()]}> <TopicMenu /></TopicContext.Provider>))

        const topicMenu = screen.getByTestId("topic_menu_select")

        expect(topicMenu).toBeInTheDocument()
    });


});

// BECAUSE TOPICMENU DOES NOT HAVE SETTOPIC ONLY JEST.FN() IDK
describe("Topic Select Menu Event Tests", () => {
    it("should be able to change topic to food", async () => {
        //can copy idea with price filters later
        render((<App />))

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        expect(topicMenuSelect.value).toBe("Food");
    });

    it("should be able to go from topic to food back to topic", async () => {
        render((<App />))

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });

        expect(topicMenuSelect.value).toBe("Topics");
    });

    it("should be able to go from topic to food back to topic back to food", async () => {
        render((<App />))

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Topics" } }) });
        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });


        expect(topicMenuSelect.value).toBe("Food");
    });
});
