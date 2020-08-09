import { advertisingData } from '__testUtils__/fixtures';

import getCampaigns from '.';

describe('getCampaigns', () => {
    test('It should get array of unique campaign names from given dataset', () => {
        expect(getCampaigns(advertisingData)).toEqual([
            advertisingData[0].Campaign,
            advertisingData[1].Campaign,
            advertisingData[2].Campaign,
        ]);
    });
});
