import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act,screen, render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import App from "../popup";

describe("<App />", () => {
  // 1. IS (<TEXT>)OFELE IN DOM,
  it("should render", () => {
    // 2. render
    render(<App />)

  });
});
// 
// describe("<App /> Side Effect: Chrome API", () => {
//   // 1. IS (<TEXT>)OFELE IN DOM,
//   it("should check that the coordinate is retrieved", () => {
//     // 2. render
//     render(<App />)
//
//     const addCityChiCompon = screen.getByTestId("topic_menu")
//
//     expect(addCityChiCompon).toBeInTheDocument();
//
//     screen.debug()
//   });
// });

describe("<App /> Document: Check Components Is In Document", () => {
  // 1. IS (<TEXT>)OFELE IN DOM,
  it("should render the topic select menu", () => {
    // 2. render
    render(<App />)

    const addCityChiCompon = screen.getByTestId("topic_menu")

    expect(addCityChiCompon).toBeInTheDocument()

    screen.debug()
  });
});

  describe("<App /> UI: Check Components Is Visible To User", () => {
    // 1. IS (<TEXT>)OFELE IN DOM,
    it("should make topic select men visible to suer", () => {
      // 2. render
      render(<App />)

      const addCityChiCompon = screen.getByTestId("topic_menu")

      expect(addCityChiCompon).toBeVisible()

      screen.debug()
    });
});
//
// describe("<App />", () => {
//   it("Unit Event Test: should be able to type input", async () => {
//     render(<App />);
//
//     const addCityChiCompon = await screen.findByTestId("input_base") as HTMLInputElement
//
//     await act(async () => {fireEvent.change(addCityChiCompon, {target: { value: "Mumbai"}})});
//
//     expect(addCityChiCompon.value).toBe("Mumbai");
//
//   });
// });
//
// describe("<App />", () => {
//   // 1. IS (<TEXT>)OFELE IN DOM,
//   it("Unit Event Test: should be empty when add button clicked", async () => {
//     // 2. render
//     render(<App />);
//     const addCityChiCompon = await screen.findByTestId("input_base") as HTMLInputElement
//     const addButton = screen.getByTestId("add-button") as HTMLButtonElement
//
//     await act(async () => {fireEvent.change(addCityChiCompon, {target: { value: "London"}})});
//     await act(async () => {fireEvent.click(addButton)});
//
//     expect(addCityChiCompon.value).toBe("");
//   });
// });
//
// describe("<App />", () => {
//   // 1. IS (<TEXT>)OFELE IN DOM,
//   global.fetch = jest.fn()
//   const mockFetch = fetch as jest.MockedFunction<typeof fetch>
//
//   it("Integration Event Test: should see card, (makes api call) after click add", async () => {
//     mockFetch.mockResolvedValue({
//       json: () => Promise.resolve({
//         name: "Prushorth Prushti",
//         main: {
//           feels_like: 9,
//           humidity: 8,
//           pressure: 7,
//           temp: 6,
//           temp_max: 5,
//           temp_min: 4,
//         },
//       },
//     ),
//
//     } as any)
//     // 2. render
//     await act(async ()=>{render(<App /> )})
//
//     const addCityChiCompon = screen.getByTestId("input_base") as HTMLInputElement
//     const addButton = screen.getByTestId("add-button") as HTMLButtonElement
//
//     await act(async () => {fireEvent.change(addCityChiCompon, {target: { value: "London"}})});
//     await act(async () => {fireEvent.click(addButton)});
//
//   });
// });
