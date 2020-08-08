import React, { useEffect, useState } from 'react';
import { ParseResult } from 'papaparse';

import { filterByDate, sortByDate } from 'services/AdvertisingDataParsers';

import { AdvertiseData } from 'types/advertisings';

import { getAdvertisingData } from 'services/APIQueries';

const Dashboard = () => {
    const [advertisingData, setAdvertisingData] = useState<AdvertiseData[]>([]);

    useEffect(() => {
        getAdvertisingData(handleAdvertisingData);
    }, []);

    const handleAdvertisingData = (results: ParseResult<AdvertiseData>) => {
        const filteredData = filterByDate(results.data);
        const sortedByDate = sortByDate(filteredData);

        setAdvertisingData(sortedByDate);
    };
    console.log(advertisingData);
    return <h1>Hello World</h1>;
};

export default Dashboard;
