import moment from 'moment';
import { chain } from 'lodash';

import { AdvertiseChartData } from 'types/advertisings';

const getClicksChartData = (chartData: AdvertiseChartData) =>
    chain(Object.entries(chartData))
        .filter(([, value]) => !!value.Clicks)
        .map(([key, value]) => ({
            x: moment(key, 'DD.MM.YYYY'),
            y: value.Clicks,
        }))
        .value();

export default getClicksChartData;
