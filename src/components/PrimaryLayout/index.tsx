import React from 'react';

const PrimaryLayout: React.FC = ({ children }) => {
    return (
        <main>
            <div className="container">{children}</div>
        </main>
    );
};

export default PrimaryLayout;
