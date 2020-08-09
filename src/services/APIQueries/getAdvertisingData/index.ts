import Papa, { ParseResult } from 'papaparse';

import { AdvertiseData } from 'types/advertisings';

const getAdvertisingData = (
    callback: (results: ParseResult<AdvertiseData>) => void
) => {
    Papa.parse(
        'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv',
        {
            download: true,
            header: true,
            complete: callback,
        }
    );
};

export default getAdvertisingData;
