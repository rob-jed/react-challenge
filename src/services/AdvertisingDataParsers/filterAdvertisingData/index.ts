import { filter } from 'lodash';

import { AdvertiseData } from 'types/advertisings';

const filterAdvertisingData = (
    advertisingData: AdvertiseData[],
    filters: {
        campaigns: string[];
        datasources: string[];
    }
) => {
    return filter(advertisingData, entry => {
        if (filters.campaigns.length && filters.datasources.length) {
            return (
                filters.campaigns.includes(entry.Campaign) &&
                filters.datasources.includes(entry.Datasource)
            );
        }

        if (filters.campaigns.length) {
            return filters.campaigns.includes(entry.Campaign);
        }

        if (filters.datasources.length) {
            return filters.datasources.includes(entry.Datasource);
        }

        return true;
    });
};

export default filterAdvertisingData;
