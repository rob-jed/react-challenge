import { chain } from 'lodash';

import { AdvertiseData } from 'types/advertisings';

const getDatasources = (data: AdvertiseData[]) =>
    chain(data)
        .uniqBy('Datasource')
        .map(entry => entry.Datasource)
        .value();

export default getDatasources;
