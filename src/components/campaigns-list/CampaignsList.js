import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaignsStart } from '../../features/campaignsSlice';
import { useNavigate } from 'react-router-dom';

const CampaignsList = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.campaigns);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCampaignsStart());
    }, [dispatch]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    if (loading) return <p>Loading campaigns...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleEditClick = (campaignId) => {
        console.log(`Edit campaign with ID: ${campaignId}`);
        navigate(`/edit/${campaignId}`);
    };

    return (
        <div>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse',textAlign: 'center' }}>
                <thead>
                <tr>
                    <th></th>
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
                        <td>
                            <button
                                onClick={() => handleEditClick(campaign.id)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                    <span className="material-icons" style={{ fontSize: '24px' }}>
                                        edit
                                    </span>
                            </button>
                        </td>
                        <td>{formatDate(campaign.StartDate)}</td>
                        <td>{formatDate(campaign.FinishDate)}</td>
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
