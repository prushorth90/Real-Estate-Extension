import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act, screen, render, fireEvent, within} from "@testing-library/react";
import App  from '../../../../../../popup'
import { MockedTab } from '../../../../../../../mocks/tab/mockTab';
import { MockedAddress } from '../../../../../../../mocks/address/mockAddress'
import { MockedPlaces } from '../../../../../../../mocks/nearby/places/mockPlaces'

global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

let mockedTab = null
let mockedAddress = null
let mockedFoodPlaces = null

beforeEach(() => {
    mockedTab = new MockedTab()
    mockedAddress = new MockedAddress()
    mockedFoodPlaces = new MockedPlaces()

})

afterEach(() => {
    mockedTab = null
    mockedAddress = null
    mockedFoodPlaces = null
})



describe("change value of type filter", () => {
  
    it("should be able to see card when change filter of type", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockSecondGoodAPI(mockFetch)
        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Cafe/i)) });

        const card = await screen.findByTestId("result card") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()


        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake Bakery 2 ")

        const totalUserRating = await screen.findByTestId("result user rating total") as HTMLParagraphElement
        expect(totalUserRating.innerHTML).toBe("Total User Ratings: 10 ")

        const priceLevel = await screen.findByTestId("result price level") as HTMLParagraphElement
        expect(priceLevel.innerHTML).toBe("Price Level: 4")

        const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
        expect(vicinity.innerHTML).toBe(" Vicinity: Fake address 2 ")

        const photoButton = await screen.findByTestId("photo button") as HTMLButtonElement
        expect(photoButton).toBeInTheDocument()

    });

    it("should be able to see none card when change filter of type  as bad empty address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)


        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadEmptyAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockBadEmptyAPI(mockFetch)

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Cafe/i)) });


        const card = await screen.findByTestId("result card other") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")


    });

    it("should be able to see error card when change filter of type  as bad invalid food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)


        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadInvalidAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockBadInvalidAPI(mockFetch)

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Cafe/i)) });



        const card = await screen.findByTestId("result card other") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("Error. Our API request has failed")


    });

    it("should be able to see none card when change filter of type as bad empty address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)


        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Cafe/i)) });



        const card = await screen.findByTestId("result card other") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")


    });

    it("should be able to see none card when change filter of type  as bad invalid address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)


        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Cafe/i)) });


        const card = await screen.findByTestId("result card other") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")


    });

})

describe("change value of type filter to restaurant and see cuisine filter", () => {

    it("should be able to see added cuisine filter", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockSecondGoodAPI(mockFetch)

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement


        expect(cuisine).toBeInTheDocument()
        expect(cuisine.value).toBe("Pizza")



    });

    it("should be able to see cards", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockSecondGoodAPI(mockFetch)

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const card = await screen.findByTestId("result card") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()

        const name = await screen.findByTestId("result name") as HTMLParagraphElement
        expect(name.innerHTML).toBe(" Fake Bakery 2 ")

        const totalUserRating = await screen.findByTestId("result user rating total") as HTMLParagraphElement
        expect(totalUserRating.innerHTML).toBe("Total User Ratings: 10 ")

        const priceLevel = await screen.findByTestId("result price level") as HTMLParagraphElement
        expect(priceLevel.innerHTML).toBe("Price Level: 4")

        const vicinity = await screen.findByTestId("result vicinity") as HTMLParagraphElement
        expect(vicinity.innerHTML).toBe(" Vicinity: Fake address 2 ")

        const photoButton = await screen.findByTestId("photo button") as HTMLButtonElement
        expect(photoButton).toBeInTheDocument()



    });

    it("should be able to see none cards if bad empty food api", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)


        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadEmptyAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockBadEmptyAPI(mockFetch)

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")

    });

    it("should be able to see error card", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)


        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadInvalidAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockBadInvalidAPI(mockFetch)

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("Error. Our API request has failed")

    });


    it("should be able to see none card when change filter of type as bad empty address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadEmptyAddressAPI(mockFetch)


        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")


    });

    it("should be able to see none card when change filter of type  as bad invalid address", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockBadInvalidAddressAPI(mockFetch)


        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const card = await screen.findByTestId("result card other") as HTMLDivElement
        expect(card).toBeVisible()
        expect(card).toBeInTheDocument()
        expect(card.innerHTML).toBe("No data to show")


    });


});

describe("change value of type filter to restaurant and then bakery so cuisine filter removed", () => {

    it("should not be able to see added cuisine filter", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockGoodAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });
        mockedFoodPlaces.mockSecondGoodAPI(mockFetch)

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement

        const secondType = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const optionsBakery = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(optionsBakery.getByText(/Bakery/i)) });
        expect(secondType.value).toBe("Bakery")

        expect(cuisine).not.toBeInTheDocument()


    });

    it("should not be able to see added cuisine filter even if bad empty food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadEmptyAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement

        const secondType = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const optionsBakery = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(optionsBakery.getByText(/Bakery/i)) });
        expect(secondType.value).toBe("Bakery")

        expect(cuisine).not.toBeInTheDocument()


    });

    it("should not be able to see added cuisine filter even if bad invalid food", async () => {
        mockedTab.mockGoodTabAPI(mockFetch)
        mockedAddress.mockGoodAddressAPI(mockFetch)

        await act(async () => { render(<App />) })

        const topicMenuSelect = screen.getByTestId("topic_menu_input") as HTMLSelectElement
        mockedFoodPlaces.mockBadInvalidAPI(mockFetch)

        await act(async () => { fireEvent.change(topicMenuSelect, { target: { value: "Food" } }) });

        const type = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const options = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(options.getByText(/Restaurant/i)) });
        expect(type.value).toBe("Restaurant")

        const cuisine = await screen.findByTestId("Input Cuisine") as HTMLSelectElement

        const secondType = screen.getByTestId("Input Type") as HTMLSelectElement
        await act(async () => { fireEvent.mouseDown(screen.getAllByRole('button')[2]) });
        const optionsBakery = within(screen.getByRole('listbox'));
        await act(async () => { fireEvent.click(optionsBakery.getByText(/Bakery/i)) });
        expect(secondType.value).toBe("Bakery")

        expect(cuisine).not.toBeInTheDocument()


    });




});
