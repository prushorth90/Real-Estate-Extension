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

