import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { screen, render, within } from "@testing-library/react";
import { PhotoButton } from '../photoButton'


describe("for when the button component renders", () => {

    it("should render photo button", () => {
        let res = createMockResult({photo_reference:"fake photo reference"})
        render(<PhotoButton result={res} index={1}/>)
        const photoButton = screen.getByTestId("photo button")
        expect(photoButton).toBeInTheDocument()
        expect(photoButton).toBeVisible()
        const {getByText} = within(screen.getByTestId("photo button"))
        expect(getByText('View Photo')).toBeInTheDocument()

    });


    it("should render photo button even if photo reference empty - will see no photo if clicked", () => {
        let res = createMockResult({})
        render(<PhotoButton result={res} index={1} />)
        const photoButton = screen.getByTestId("photo button")
        expect(photoButton).toBeInTheDocument()
        expect(photoButton).toBeVisible()
        const { getByText } = within(screen.getByTestId("photo button"))
        expect(getByText('View Photo')).toBeInTheDocument()

    });

    it("should render photo button even if photo reference undefined - will see error if clicked", () => {
        let res = createMockResult({ photo_reference: undefined })
        render(<PhotoButton result={res} index={1} />)
        const photoButton = screen.getByTestId("photo button")
        expect(photoButton).toBeInTheDocument()
        expect(photoButton).toBeVisible()
        const { getByText } = within(screen.getByTestId("photo button"))
        expect(getByText('View Photo')).toBeInTheDocument()

    });



});



function createMockResult(mapping) {
    let res = {
        photos: [mapping],
    }
    return res
}