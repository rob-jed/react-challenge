import React, { useEffect, useState } from 'react';
import { ParseResult } from 'papaparse';

import {
    filterByDate,
    getCampaigns,
    getDatasources,
    sortByDate,
} from 'services/AdvertisingDataParsers';

import { AdvertiseData } from 'types/advertisings';

import { getAdvertisingData } from 'services/APIQueries';

const Dashboard = () => {
    const [advertisingData, setAdvertisingData] = useState<{
        data: AdvertiseData[];
        campaigns: string[];
        datasources: string[];
    } | null>(null);

    useEffect(() => {
        getAdvertisingData(handleAdvertisingData);
    }, []);

    const handleAdvertisingData = (results: ParseResult<AdvertiseData>) => {
        const filteredData = filterByDate(results.data);
        const sortedByDate = sortByDate(filteredData);
        const campaigns = getCampaigns(sortedByDate);
        const datasources = getDatasources(sortedByDate);

        setAdvertisingData({
            data: sortedByDate,
            campaigns,
            datasources,
        });
    };
    console.log(advertisingData);
    return <h1>Hello World</h1>;
};

export default Dashboard;
