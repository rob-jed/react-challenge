import { sortBy } from 'lodash';

import { AdvertiseData } from 'types/advertisings';

const sortByDate = (data: AdvertiseData[]) =>
    sortBy(data, (entry) => new Date(entry.Date));

export default sortByDate;
