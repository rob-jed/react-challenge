import React, { useEffect, useState } from 'react';
import { ParseResult } from 'papaparse';
import { Line } from 'react-chartjs-2';
import { ValueType } from 'react-select';

import ChartDescription from 'components/ChartDescription';
import Filters from 'components/Filters';
import PrimaryLayout from 'components/PrimaryLayout';
import { SelectOption } from 'components/Select';

import {
    combineDaysData,
    filterAdvertisingData,
    filterByDate,
    getCampaigns,
    getClicksChartData,
    getDatasources,
    getImpressionsChartData,
} from 'services/AdvertisingDataParsers';
import { getAdvertisingData } from 'services/APIQueries';

import { AdvertiseChartData, AdvertiseData } from 'types/advertisings';

const Dashboard = () => {
    const [advertisingData, setAdvertisingData] = useState<{
        data: AdvertiseData[];
        chartData: AdvertiseChartData;
        campaigns: string[];
        datasources: string[];
    } | null>(null);
    const [activeFilters, setActiveFilters] = useState<{
        campaigns: string[];
        datasources: string[];
    }>({
        campaigns: [],
        datasources: [],
    });
    const handleAdvertisingData = (results: ParseResult<AdvertiseData>) => {
        const filteredData = filterByDate(results.data);
        const campaigns = getCampaigns(filteredData);
        const datasources = getDatasources(filteredData);

        setAdvertisingData({
            data: filteredData,
            chartData: combineDaysData(filteredData),
            campaigns,
            datasources,
        });
    };

    useEffect(() => {
        getAdvertisingData(handleAdvertisingData);
    }, []);

    const onSelect = (
        selectedOptions: ValueType<SelectOption>,
        name: string
    ) => {
        if (!selectedOptions) {
            setActiveFilters({
                ...activeFilters,
                [name]: [],
            });

            return;
        }

        setActiveFilters({
            ...activeFilters,
            [name]: (selectedOptions as SelectOption[]).map(
                selectedOption => selectedOption!.value
            ),
        });
    };
    const applyFilters = () => {
        const filteredChartData = filterAdvertisingData(
            advertisingData!.data,
            activeFilters
        );

        setAdvertisingData({
            ...advertisingData!,
            chartData: combineDaysData(filteredChartData),
        });
    };

    if (!advertisingData) {
        return null;
    }

    return (
        <PrimaryLayout>
            <Filters
                campaignsOptions={advertisingData.campaigns.map(entry => ({
                    label: entry,
                    value: entry,
                }))}
                datasourcesOptions={advertisingData.datasources.map(entry => ({
                    label: entry,
                    value: entry,
                }))}
                onSelect={onSelect}
                onSubmit={applyFilters}
            />

            <Line
                data={{
                    datasets: [
                        {
                            label: 'Clicks',
                            borderColor: 'rgb(255, 99, 132)',
                            yAxisID: 'clicks',
                            fill: false,
                            data: getClicksChartData(advertisingData.chartData),
                        },
                        {
                            label: 'Impressions',
                            borderColor: 'rgb(54, 162, 235)',
                            yAxisID: 'impressions',
                            fill: false,
                            data: getImpressionsChartData(
                                advertisingData.chartData
                            ),
                        },
                    ],
                }}
                options={{
                    legend: {
                        position: 'bottom',
                    },
                    scales: {
                        xAxes: [
                            {
                                type: 'time',
                                display: true,
                                distribution: 'series',
                                time: {
                                    unit: 'day',
                                    tooltipFormat: 'MMMM DD',
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

            <ChartDescription />
        </PrimaryLayout>
    );
};

export default Dashboard;
