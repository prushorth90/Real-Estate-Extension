import { chrome } from 'jest-chrome'
import { Response } from './mockResponse'

export class MockedPlaces {
    public constructor() {

    }

    public mockGoodAPI(mockFetch) {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({
                results: [{
                    name: "Fake Bakery",
                    price_level: 3,
                    rating: 5,
                    user_ratings_total: 90,
                    vicinity: "Fake address",
                    photos: [
                        {
                            height: 1840,
                            photo_reference: "fake photo reference",
                            width: 3264
                        }
                    ],
                    url: "fake url"
                }]


            },
            ),

        } as any)
    }

    public mockBadEmptyAPI(mockFetch) {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({
                results: []
            },
            ),

        } as any)
    }

    public async mockBadInvalidAPI(mockFetch) {
        await mockFetch.mockImplementation(async (queryInfo) => {
            let f = new Response(400)
            return Promise.resolve(f)

        })
    }

    public mockSecondGoodAPI(mockFetch) {
    mockFetch.mockResolvedValue({
        json: () => Promise.resolve({
            results: [{
                name: "Fake Bakery 2",
                price_level: 4,
                rating: 3,
                user_ratings_total: 10,
                vicinity: "Fake address 2"
            }]
        },
        ),

    } as any)
}
}