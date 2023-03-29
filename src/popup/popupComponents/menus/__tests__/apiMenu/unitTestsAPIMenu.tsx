import React from 'react'
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import * as testHelper from '../../../../../testHelpers/testHelpers'
import { APIChoiceMenu } from "../../apiMenu/apiMenu";
import { APIChoices } from "../../apiMenu/apiChoices";
import { APIChoiceContext } from "../../../../popup";

describe("when the api menu has been rendered", () => {

    it("should show the api choices value", async () => {
        render((<APIChoiceContext.Provider value={[APIChoices.APIChoices, jest.fn()]}> <APIChoiceMenu /></APIChoiceContext.Provider>))
        const apiMenuSelect = screen.getByTestId("api_menu_input") as HTMLSelectElement
        await testHelper.checkMenuValue(apiMenuSelect, "API Choices")
    });

});

