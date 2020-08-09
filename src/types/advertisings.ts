export type AdvertiseData = {
    Campaign: string;
    Clicks?: string;
    Datasource: string;
    Date: string;
    Impressions?: string;
};

export type AdvertiseChartData = {
    [key: string]: { Clicks: number; Impressions: number };
};
