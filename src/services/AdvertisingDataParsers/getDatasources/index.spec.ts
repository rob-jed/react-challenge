import { advertisingData } from '__testUtils__/fixtures';

import getDatasources from '.';

describe('getDatasources', () => {
    test('It should get array of unique datasources names from given dataset', () => {
        expect(getDatasources(advertisingData)).toEqual([
            advertisingData[0].Datasource,
            advertisingData[2].Datasource,
        ]);
    });
});
