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

class Response {
  // could make obj for apartment like open weather data
  public headers;
  public ok;
  public redirected;
  public status;
  public body;
  public bodyUsed;
  public statusText;
  public trailer;
  public type;
  public url;
  public clone;
  public arrayBuffer;
  public blob;
  public formData;
  public json;
  public text;




  public constructor(status) {
    this.headers = 3
    this.ok = true
    this.redirected = 0
    this.status = status

  }
}


async function mockTabAPI() {
  await chrome.tabs.query.mockImplementation(async (queryInfo) => {
    let f = new Array<Tab>()
    f.push(new Tab())
    return Promise.resolve(f)

  })
}

function mockGoodAddressAPI(){
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

function mockBadEmptyAddressAPI() {
  mockFetch.mockResolvedValue({
    json: () => Promise.resolve({
      results: []
    },
    ),

  } as any)
}

async function mockBadInvalidAddressAPI() {
  await mockFetch.mockImplementation(async (queryInfo) => {
    let f = new Response(400)
    return Promise.resolve(f)

  })
}

describe("when the subcomponents have been rendered", () => {

  it("should show the topic select menu", async () => {
      
      mockTabAPI()
      mockGoodAddressAPI()

      await act(async () => {render(<App />)})
      const topicMenuInput = screen.getByTestId("topic_menu_input") as HTMLSelectElement

      expect(topicMenuInput).toBeInTheDocument()
      expect(topicMenuInput.value).toBe("Topics") 

  });

  it("should show the topic select menu even if bad empty address", async () => {
    
    mockTabAPI()
    mockBadEmptyAddressAPI()

    await act(async () => { render(<App />) })
    const topicMenuInput = screen.getByTestId("topic_menu_input") as HTMLSelectElement

    expect(topicMenuInput).toBeInTheDocument()
    expect(topicMenuInput.value).toBe("Topics") 

  });

  it("should show the topic select menu even if bad invalid address", async () => {
    
    mockTabAPI()
    mockBadInvalidAddressAPI()

    await act(async () => { render(<App />) })
    const topicMenuInput = screen.getByTestId("topic_menu_input") as HTMLSelectElement

    expect(topicMenuInput).toBeInTheDocument()
    expect(topicMenuInput.value).toBe("Topics") 

  });

});

