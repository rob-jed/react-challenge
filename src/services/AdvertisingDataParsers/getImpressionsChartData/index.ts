import moment from 'moment';
import { chain } from 'lodash';

import { AdvertiseChartData } from 'types/advertisings';

const getImpressionsChartData = (chartData: AdvertiseChartData) =>
    chain(Object.entries(chartData))
        .filter(([, value]) => !!value.Impressions)
        .map(([key, value]) => ({
            x: moment(key, 'DD.MM.YYYY'),
            y: value.Impressions,
        }))
        .value();

export default getImpressionsChartData;
