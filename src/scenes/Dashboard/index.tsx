import React, { useEffect, useState } from 'react';
import { ParseResult } from 'papaparse';
import { Line } from 'react-chartjs-2';
import { createFilter, ValueType } from 'react-select';
import { filter } from 'lodash';

import PrimaryLayout from 'components/PrimaryLayout';
import Select, { SelectOption } from 'components/Select';

import {
    combineDaysData,
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

    const handleChange = (
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
        const filteredChartData = filter(advertisingData?.data, entry => {
            if (
                activeFilters.campaigns.length &&
                activeFilters.datasources.length
            ) {
                return (
                    activeFilters.campaigns.includes(entry.Campaign) &&
                    activeFilters.datasources.includes(entry.Datasource)
                );
            }

            if (activeFilters.campaigns.length) {
                return activeFilters.campaigns.includes(entry.Campaign);
            }

            if (activeFilters.datasources.length) {
                return activeFilters.datasources.includes(entry.Datasource);
            }

            return true;
        });

        setAdvertisingData({
            ...advertisingData!,
            chartData: combineDaysData(filteredChartData as any),
        });
    };

    if (!advertisingData) {
        return null;
    }

    return (
        <PrimaryLayout>
            <Select
                filterOption={createFilter({ ignoreAccents: false })}
                isMulti
                label="Campaigns"
                name="campaigns"
                handleSelect={handleChange}
                options={advertisingData.campaigns.map(entry => ({
                    label: entry,
                    value: entry,
                }))}
            />

            <Select
                filterOption={createFilter({ ignoreAccents: false })}
                isMulti
                label="Datasources"
                name="datasources"
                handleSelect={handleChange}
                options={advertisingData.datasources.map(entry => ({
                    label: entry,
                    value: entry,
                }))}
            />

            <button type="button" onClick={applyFilters}>
                Apply
            </button>

            <Line
                data={{
                    datasets: [
                        {
                            label: 'Clicks',
                            borderColor: 'red',
                            yAxisID: 'clicks',
                            fill: false,
                            data: getClicksChartData(advertisingData.chartData),
                        },
                        {
                            label: 'Impressions',
                            borderColor: 'blue',
                            yAxisID: 'impressions',
                            fill: false,
                            data: getImpressionsChartData(
                                advertisingData.chartData
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
