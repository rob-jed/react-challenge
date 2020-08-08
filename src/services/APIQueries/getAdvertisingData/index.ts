import Papa, { ParseResult } from 'papaparse';

import { AdvertiseData } from 'types/advertisings';

const getAdvertisingData = (
    callback: (results: ParseResult<AdvertiseData>) => void
) => {
    Papa.parse('http://localhost:3000/data.csv', {
        download: true,
        header: true,
        complete: callback,
    });
};

export default getAdvertisingData;
