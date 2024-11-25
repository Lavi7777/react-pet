import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaignsStart } from '../features/campaignsSlice';

const CampaignsList = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.campaigns);

    useEffect(() => {
        dispatch(fetchCampaignsStart());
    }, [dispatch]);

    if (loading) return <p>Loading campaigns...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th>Start Date</th>
                    <th>Finish Date</th>
                    <th>Brand</th>
                    <th>Affiliate ID</th>
                    <th>Country</th>
                    <th>Active</th>
                </tr>
                </thead>
                <tbody>
                {items.map((campaign) => (
                    <tr key={campaign.id}>
                        <td>{campaign.StartDate}</td>
                        <td>{campaign.FinishDate}</td>
                        <td>{campaign.Brand}</td>
                        <td>{campaign.AffId}</td>
                        <td>{campaign.Country}</td>
                        <td>{campaign.Active ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CampaignsList;
