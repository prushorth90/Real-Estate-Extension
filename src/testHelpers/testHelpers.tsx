import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent,within } from "@testing-library/react";
import { App } from "../popup/popup";


export async function openPopup(){
    await act(async () => { render(<App />) })
    const popup = screen.getByTestId("popup")
    expect(popup).toBeInTheDocument()
}

export async function changeInAPIMenu(api) {
    const apiMenuSelect = screen.getByTestId("api_menu_input") as HTMLSelectElement
    await act(async () => { 
        fireEvent.change(apiMenuSelect, { target: { value: api }}) 
    });
    checkMenuValue(apiMenuSelect, api)
}

export async function checkMenuValue(apiMenuSelect, api) {
    expect(apiMenuSelect.value).toBe(api)
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
    checkTopicMenu(topicMenuSelect, topic)
}

export function checkTopicMenu(topicMenuSelect, topic) {
    expect(topicMenuSelect).toBeInTheDocument()
    expect(topicMenuSelect.value).toBe(topic);
}

export async function checkLoadingCard() {
    const card = await screen.findByTestId("result card other") as HTMLDivElement
    expect(card).toBeVisible()
    expect(card).toBeInTheDocument()
    expect(card.innerHTML).toBe("Loading. Please wait while we collect your results")
}

export async function checkNoneCard() {
    const card = await screen.findByTestId("result card other") as HTMLDivElement
    expect(card).toBeVisible()
    expect(card).toBeInTheDocument()
    expect(card.innerHTML).toBe("No data to show")
}

export async function checkHouseNotFoundCard() {
    const card = await screen.findByTestId("result card other") as HTMLDivElement
    expect(card).toBeVisible()
    expect(card).toBeInTheDocument()
    expect(card.innerHTML).toBe("Could not locate house. Try and enter latitude and longitude above. For example latitude = 41.774880 and longitude = -87.613800")
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
    const type = await screen.findByTestId(`Input ${filter}`) as HTMLSelectElement
    await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[filterNum]) });
    const options = within(screen.getByRole('listbox'));
    await act(async () => { fireEvent.click(options.getByText(val)) });
    expect(type.value).toBe(val)
}

export async function checkFilterComponent(filter, val) {
    const foundFilter = await screen.findByTestId(`Input ${filter}`) as HTMLSelectElement
    expect(foundFilter.value).toBe(val)
}

export async function clickPhotoButton(photoApi, mockedPhotos, mockFetch) {
    if (photoApi === "good valid") {
        mockedPhotos.mockGoodPhotoAPI(mockFetch)
    }
    else if (photoApi === "bad invalid") {
        mockedPhotos.mockBadInvalidPhotoAPI(mockFetch)
    }
    const photoButton = screen.getByTestId("photo button") as HTMLButtonElement
    await act(async () => { fireEvent.click(photoButton) });
}

export async function checkNonePhoto() {
    const dialog = await screen.findByTestId("photo none") as HTMLDivElement
    expect(dialog).toBeVisible()
    expect(dialog).toBeInTheDocument()
    expect(dialog.innerHTML).toBe(" No Photo ")
}

export async function checkErrorPhoto() {
    const dialog = await screen.findByTestId("photo error") as HTMLDivElement
    expect(dialog).toBeVisible()
    expect(dialog).toBeInTheDocument()
    expect(dialog.innerHTML).toBe("Error. Our API request has failed ")
}

export async function checkReadyPhoto() {
    const dialog = await screen.findByTestId("photo ready") as HTMLImageElement
    expect(dialog).toBeInTheDocument()
    expect(dialog).toBeVisible()
}

export async function checkPhotoButtonComponent() {
    const photoButton = screen.getByTestId("photo button")
    expect(photoButton).toBeInTheDocument()
    expect(photoButton).toBeVisible()
    const { getByText } = within(screen.getByTestId("photo button"))
    expect(getByText('View Photo')).toBeInTheDocument()
}