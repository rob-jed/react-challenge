import React, { useEffect, useState } from 'react';
import { ParseResult } from 'papaparse';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

import PrimaryLayout from 'components/PrimaryLayout';

import {
    combineDaysData,
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
        chartData: ReturnType<typeof combineDaysData>;
        campaigns: string[];
        datasources: string[];
    } | null>(null);

    const handleAdvertisingData = (results: ParseResult<AdvertiseData>) => {
        const filteredData = filterByDate(results.data);
        const sortedByDate = sortByDate(filteredData);
        const campaigns = getCampaigns(sortedByDate);
        const datasources = getDatasources(sortedByDate);

        setAdvertisingData({
            data: sortedByDate,
            chartData: combineDaysData(sortedByDate),
            campaigns,
            datasources,
        });
    };

    useEffect(() => {
        getAdvertisingData(handleAdvertisingData);
    }, []);

    if (!advertisingData) {
        return null;
    }

    return (
        <PrimaryLayout>
            <Line
                data={{
                    datasets: [
                        {
                            label: 'Clicks',
                            borderColor: 'red',
                            yAxisID: 'clicks',
                            fill: false,
                            data: Object.entries(advertisingData.chartData).map(
                                ([key, value]) => ({
                                    x: moment(key, 'DD.MM.YYYY'),
                                    y: value.Clicks,
                                })
                            ),
                        },
                        {
                            label: 'Impressions',
                            yAxisID: 'impressions',
                            fill: false,
                            data: Object.entries(advertisingData.chartData).map(
                                ([key, value]) => ({
                                    x: moment(key, 'DD.MM.YYYY'),
                                    y: value.Impressions,
                                })
                            ),
                        },
                    ],
                }}
                options={{
                    scales: {
                        xAxes: [
                            {
                                type: 'time',
                                display: true,
                                time: {
                                    unit: 'day',
                                },
                            },
                        ],
                        yAxes: [
                            {
                                id: 'clicks',
                                ticks: {
                                    beginAtZero: true,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Clicks',
                                },
                            },
                            {
                                id: 'impressions',
                                ticks: {
                                    beginAtZero: true,
                                },
                                position: 'right',
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Impressions',
                                },
                            },
                        ],
                    },
                }}
            />
        </PrimaryLayout>
    );
};

export default Dashboard;
