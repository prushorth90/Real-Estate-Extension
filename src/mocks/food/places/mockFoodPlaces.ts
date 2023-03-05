import { chrome } from 'jest-chrome'
import { Response } from './mockResponse'

export class MockedFoodPlaces {
    public constructor() {

    }

    public mockGoodFoodAPI(mockFetch) {
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

    public mockBadEmptyFoodAPI(mockFetch) {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({
                results: []
            },
            ),

        } as any)
    }

    public async mockBadInvalidFoodAPI(mockFetch) {
        await mockFetch.mockImplementation(async (queryInfo) => {
            let f = new Response(400)
            return Promise.resolve(f)

        })
    }

    public mockSecondGoodFoodAPI(mockFetch) {
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