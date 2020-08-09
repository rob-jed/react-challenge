import { advertisingData } from '__testUtils__/fixtures';

import filterAdvertisingData from '.';

describe('filterAdvertisingData', () => {
    test('It should return all elements when no filters are set', () => {
        const result = filterAdvertisingData(advertisingData, {
            campaigns: [],
            datasources: [],
        });

        expect(result).toEqual(advertisingData);
    });

    test('It should return only elements matching filters set', () => {
        expect(
            filterAdvertisingData(advertisingData, {
                campaigns: [advertisingData[0].Campaign],
                datasources: [],
            })
        ).toEqual([advertisingData[0]]);
        expect(
            filterAdvertisingData(advertisingData, {
                campaigns: [advertisingData[0].Campaign],
                datasources: [advertisingData[0].Datasource],
            })
        ).toEqual([advertisingData[0]]);
        expect(
            filterAdvertisingData(advertisingData, {
                campaigns: [],
                datasources: [advertisingData[1].Datasource],
            })
        ).toEqual([advertisingData[0], advertisingData[1]]);
        expect(
            filterAdvertisingData(advertisingData, {
                campaigns: [advertisingData[2].Campaign],
                datasources: [advertisingData[0].Datasource],
            })
        ).toEqual([]);
    });
});
