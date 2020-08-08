import { filter } from 'lodash';

import { AdvertiseData } from 'types/advertisings';

const filterByDate = (data: AdvertiseData[]) =>
    filter(data, (entry) => entry.Date) as AdvertiseData[];

export default filterByDate;
