import { chrome } from 'jest-chrome'
import {Response} from '../nearby/places/mockResponse'


export class MockedAddress{

    public constructor() {
   
    }

    public mockGoodAddressAPI(mockFetch) {
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

    public mockBadEmptyAddressAPI(mockFetch) {
        mockFetch.mockResolvedValue({
            json: () => Promise.resolve({
                results: []
            },
            ),

        } as any)
    }

    public async  mockBadInvalidAddressAPI(mockFetch) {
        await mockFetch.mockImplementation(async (queryInfo) => {
            let f = new Response(400)
            return Promise.resolve(f)

        })
    }
}