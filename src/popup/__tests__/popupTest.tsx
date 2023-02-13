import React from 'react'
import "@testing-library/jest-dom/extend-expect"
import { act,screen, render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import App from "../popup";
import { chrome } from 'jest-chrome'

global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

class Tab {
  // could make obj for apartment like open weather data
  public index;
  public pinned;
  public highlighted;
  public windowId;
  public active;
  public incognito;
  public selected;
  public discarded;
  public autoDiscardable;
  public groupId;
  public url;
  public constructor() {
     this.index = 3
     this.highlighted = true
     this.windowId=0
     this.active=true
     this.incognito=true
     this.selected=true
     this.discarded=true
     this.autoDiscardable=true
     this.groupId=3
     this.url ="https://www.realtor.com/realestateandhomes-detail/6224-S-Rockwell-St_Chicago_IL_60629_M83401-45847"
  }
} 

async function mockTabAPI() {
  await chrome.tabs.query.mockImplementation(async (queryInfo) => {
    let f = new Array<Tab>()
    f.push(new Tab())
    return Promise.resolve(f)

  })
}

function mockAddressAPI(){
  mockFetch.mockResolvedValue({
    json: () => Promise.resolve({
      results: [{

        geometry: {
          location: {
            lat: 41.814637,
            lng: -87.596083
          }
        }
      }]


    },
    ),

  } as any)
}


describe("<App />", () => {
  // 1. IS (<TEXT>)OFELE IN DOM,
  it("should render", async () => {
    // 2. render
    mockTabAPI()
    mockAddressAPI()

    await act(async () => {render(<App />)})
    screen.debug()
  });
});

describe("<App /> Document: Check Components Is In Document", () => {
  // 1. IS (<TEXT>)OFELE IN DOM,
  it("should render the topic select menu", async () => {
    // 2. render
    mockTabAPI()
    mockAddressAPI()

    await act(async () => { render(<App />) })

    const addCityChiCompon = await screen.findByTestId("topic_menu_select")

    expect(addCityChiCompon).toBeInTheDocument()

    screen.debug()
  });
});

  describe("<App /> UI: Check Components Is Visible To User", () => {
    // 1. IS (<TEXT>)OFELE IN DOM,
    it("should make topic select men visible to suer",async () => {
      // 2. render
      mockTabAPI()
      mockAddressAPI()

      await act(async () => { render(<App />) })

      const addCityChiCompon = await screen.findByTestId("topic_menu_select")

      expect(addCityChiCompon).toBeVisible()

      screen.debug()
    });
});
