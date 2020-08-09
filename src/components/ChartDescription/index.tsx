import React from 'react';

import styles from './styles.module.scss';

const ChartDescription = () => {
    return (
        <div className={styles.DescriptionWrapper}>
            <h2 className={styles.DescriptionHeader}>
                Adverity Advertising Data ETL-V Challenge
            </h2>

            <ul className={styles.DescriptionList}>
                <li>
                    Select zero to N <em>Datasources</em>
                </li>
                <li>
                    Select zero to N <em>Campaigns</em>
                </li>
            </ul>
            <span className={styles.ListNote}>
                (where zero means &quot;All&quot;)
            </span>

            <p className={styles.DescriptionParagraph}>
                Hitting &quot;Apply&quot;, filters the chart to show a
                timeseries for both <em>Clicks</em> and <em>Impressions</em> for
                given <em>Datasources</em> and <em>Campaigns</em> - logical AND
            </p>
        </div>
    );
};

export default ChartDescription;
