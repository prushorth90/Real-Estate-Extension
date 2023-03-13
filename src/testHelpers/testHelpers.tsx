import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent,within } from "@testing-library/react";
import { App } from "../popup/popup";


export async function changeToNearbyPlaces() {
    await act(async () => {
        render(<App />) })
    const apiMenuSelect = screen.getByTestId("api_menu_input") as HTMLSelectElement
        await act(async () => { fireEvent.change(apiMenuSelect, { target: { value: "Nearby Places" } }) });
    }

export async function changeTopic(topic, topicAPI, mockedPlaces, mockFetch) {
    const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
    if (topicAPI === "good valid") {
        mockedPlaces.mockGoodAPI(mockFetch)
    }
    else if (topicAPI === "bad empty") {
        mockedPlaces.mockBadEmptyAPI(mockFetch)
    }
    else if (topicAPI === "bad invalid") {
        mockedPlaces.mockBadInvalidAPI(mockFetch)
    }
    await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: topic } }) });
    expect(topicMenuSelect).toBeInTheDocument()
    expect(topicMenuSelect.value).toBe(topic);
}

export async function checkNoneCard() {
    const card = await screen.findByTestId("result card other") as HTMLDivElement
    expect(card).toBeVisible()
    expect(card).toBeInTheDocument()
    expect(card.innerHTML).toBe("No data to show")
}

export async function checkErrorCard() {
    const card = await screen.findByTestId("result card other") as HTMLDivElement
    expect(card).toBeVisible()
    expect(card).toBeInTheDocument()
    expect(card.innerHTML).toBe("Error. Our API request has failed")
}

export async function checkReadyResultCard() {
    const card = await screen.findByTestId("result card") as HTMLDivElement
    expect(card).toBeVisible()
    expect(card).toBeInTheDocument()
    const name = await screen.findByTestId("result name") as HTMLParagraphElement
    expect(name.innerHTML).toBe(" Fake Bakery ")

    const totalUserRating = await screen.findByTestId("result user rating total") as HTMLParagraphElement
    expect(totalUserRating.innerHTML).toBe("Total User Ratings: 90 ")

    const priceLevel = await screen.findByTestId("result price level") as HTMLParagraphElement
    expect(priceLevel.innerHTML).toBe("Price Level: 3")

    const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
    expect(vicinity.innerHTML).toBe(" Vicinity: Fake address ")

    const photoButton = await screen.findByTestId("photo button") as HTMLButtonElement
    expect(photoButton).toBeInTheDocument()
}

export async function changeFilter(filter, filterNum, val) {
    const type = screen.getByTestId(`Input ${filter}`) as HTMLSelectElement
    await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[filterNum]) });
    const options = within(screen.getByRole('listbox'));
    await act(async () => { fireEvent.click(options.getByText(val)) });
    expect(type.value).toBe(val)
}
