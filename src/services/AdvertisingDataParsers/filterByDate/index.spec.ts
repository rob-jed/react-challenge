import { advertisingData } from '__testUtils__/fixtures';

import filterByDate from '.';

describe('filterByDate', () => {
    test('It should remove elements which have no Date specified', () => {
        expect(
            filterByDate([
                ...advertisingData,
                { Date: '', Campaign: 'Camp', Datasource: 'Data' },
            ])
        ).toEqual(advertisingData);
    });
});
