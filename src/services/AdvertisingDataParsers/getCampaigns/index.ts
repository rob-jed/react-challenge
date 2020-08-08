import { chain } from 'lodash';

import { AdvertiseData } from 'types/advertisings';

const getCampaigns = (data: AdvertiseData[]) =>
    chain(data)
        .uniqBy('Campaign')
        .map(entry => entry.Campaign)
        .value();

export default getCampaigns;
