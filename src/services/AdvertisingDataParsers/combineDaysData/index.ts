import { AdvertiseData } from 'types/advertisings';

const combineDaysData = (data: AdvertiseData[]) => {
    const results: {
        [key: string]: { Clicks: number; Impressions: number };
    } = {};

    data.forEach(entry => {
        if (results[entry.Date]) {
            results[entry.Date].Clicks += Number(entry.Clicks);
            results[entry.Date].Impressions += Number(entry.Impressions);

            return;
        }

        results[entry.Date] = {
            Clicks: Number(entry.Clicks),
            Impressions: Number(entry.Impressions),
        };
    });

    return results;
};

export default combineDaysData;
