import { chrome } from 'jest-chrome'

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
        this.windowId = 0
        this.active = true
        this.incognito = true
        this.selected = true
        this.discarded = true
        this.autoDiscardable = true
        this.groupId = 3
        this.url = "https://www.realtor.com/realestateandhomes-detail/6224-S-Rockwell-St_Chicago_IL_60629_M83401-45847"
    }
}



export class MockedTab{

    public constructor() {

    }

    public async mockGoodTabAPI() {
        await chrome.tabs.query.mockImplementation(async (queryInfo) => {
            let f = new Array<Tab>()
            f.push(new Tab())
            return Promise.resolve(f)

        })
    }
}