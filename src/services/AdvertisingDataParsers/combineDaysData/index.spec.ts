import { advertisingData } from '__testUtils__/fixtures';

import combineDaysData from '.';

describe('combineDaysData', () => {
    test('It should group Clicks and Impressions for the same day under one key', () => {
        const result = combineDaysData(advertisingData);

        expect(result[advertisingData[0].Date].Clicks).toEqual(
            Number(advertisingData[0].Clicks) +
                Number(advertisingData[1].Clicks)
        );
        expect(result[advertisingData[0].Date].Impressions).toEqual(
            Number(advertisingData[0].Impressions) +
                Number(advertisingData[1].Impressions)
        );
    });

    test('It should return object with keys equal to given day Date', () => {
        const result = combineDaysData(advertisingData);

        expect(result[advertisingData[0].Date]).toBeTruthy();
        expect(result[advertisingData[2].Date]).toBeTruthy();
    });
});
