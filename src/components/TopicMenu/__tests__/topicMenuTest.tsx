import React from 'react'
import ReactDOM from 'react-dom'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import {TopicMenu} from "../topicMenu";
import {App} from "../../../popup";

import { TopicContext } from '../../../popup/popup'

describe("Unit test", () => {
    // 1. IS (<TEXT>)OFELE IN DOM,
    it("should render", () => {
        // 2. render
        render((<TopicContext.Provider value={["Topics", jest.fn()]}> <TopicMenu /></TopicContext.Provider>))

    });
});

describe("Unit Test Check Components Is In Document", () => {

    it("should render the topic select menu", () => {

        render((<TopicContext.Provider value={["Topics", jest.fn()]}> <TopicMenu /></TopicContext.Provider>))

        const topicMenu = screen.getByTestId("topic_menu_select")

        expect(topicMenu).toBeInTheDocument()
    });
});


describe("Unit UI Test Check Components Is In UI", () => {

    it("should make topic select menu visibile to user", () => {

        render((<TopicContext.Provider value={["Topics", jest.fn()]}> <TopicMenu /></TopicContext.Provider>))

        const topicMenuSelect = screen.getByTestId("topic_menu_select")

        expect(topicMenuSelect).toBeVisible()

    });

});
