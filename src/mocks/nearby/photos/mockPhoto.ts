import { chrome } from 'jest-chrome'
import { MockedPhotoResponse } from './mockPhotoResponse'

export class MockedPhoto {

    public constructor() {

    }

    public async mockGoodPhotoAPI(mockFetch) {

        await mockFetch.mockImplementation(async (queryInfo) => {
            let f = new MockedPhotoResponse("fake url")
            return Promise.resolve(f)

        })

    }

    public mockBadEmptyPhotoAPI(mockFetch) {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({
                results: [{
                    name: "Bakery 1",
                    price_level: 0,
                    rating: 2,
                    user_ratings_total: 56,
                    vicinity: "Fake address 1",
                    photos: undefined,
                    url: "fake url"
                }]


            },
            ),

        } as any)
    }

    public async mockBadInvalidPhotoAPI(mockFetch) {

        await mockFetch.mockImplementation(async (queryInfo) => {
            let f = new MockedPhotoResponse(undefined)
            return Promise.resolve(f)

        })

    }
}


