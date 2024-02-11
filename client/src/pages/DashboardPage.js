// client/src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import './DashboardPageStyles.css'; // Ensure you have updated this CSS file with the new styles below

const mockData = {
    rents: [
        { id: 1, property: '123 Main St', amount: '$1200', dueDate: '2024-03-01' },
        { id: 2, property: '456 Elm St', amount: '$800', dueDate: '2024-03-01' },
    ],
    maintenanceRequests: [
        { id: 1, property: '123 Main St', issue: 'Leaky faucet', status: 'Pending' },
        { id: 2, property: '456 Elm St', issue: 'Broken heater', status: 'Resolved' },
    ],
};

function DashboardPage() {
    const [rents, setRents] = useState([]);
    const [maintenanceRequests, setMaintenanceRequests] = useState([]);

    useEffect(() => {
        setRents(mockData.rents);
        setMaintenanceRequests(mockData.maintenanceRequests);
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="rents-section">
                <h2>Rents</h2>
                <div className="rents-list">
                    {rents.map(rent => (
                        <div className="rent-item" key={rent.id}>
                            <h3>{rent.property}</h3>
                            <p><strong>Amount:</strong> {rent.amount}</p>
                            <p><strong>Due Date:</strong> {rent.dueDate}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="maintenance-section">
                <h2>Maintenance Requests</h2>
                <div className="maintenance-list">
                    {maintenanceRequests.map(request => (
                        <div className="maintenance-item" key={request.id}>
                            <h3>{request.property}</h3>
                            <p><strong>Issue:</strong> {request.issue}</p>
                            <p><strong>Status:</strong> {request.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
