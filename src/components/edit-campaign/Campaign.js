import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaignById, updateCampaign } from '../../features/campaignsSlice';

const Campaign = () => {
    const { id } = useParams(); // Получаем ID из URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items, loading, error } = useSelector((state) => state.campaigns);
    const campaign = items.find((campaign) => campaign.id === id); // Ищем кампанию по ID

    // Инициализация React Hook Form
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (campaign) {

            setValue("StartDate", campaign.StartDate);
            setValue("FinishDate", campaign.FinishDate);
            setValue("Brand", campaign.Brand);
            setValue("Country", campaign.Country);
            setValue("Active", campaign.Active);

        }
    }, [campaign, setValue]);

    const onSubmit = (data) => {
        dispatch(updateCampaign({ id, ...data })); // Обновляем кампанию
        navigate('/'); // После сохранения редиректим на главную страницу
    };

    if (loading) return <p>Loading campaign...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!campaign) return <p>Campaign not found</p>;

    return (
        <div>
            <h1>Edit Campaign</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Start Date</label>
                    <input
                        type="date"
                        {...register("StartDate", { required: "Start Date is required" })}
                    />
                    {errors.StartDate && <span>{errors.StartDate.message}</span>}
                </div>
                <div>
                    <label>Finish Date</label>
                    <input
                        type="date"
                        {...register("FinishDate", { required: "Finish Date is required" })}
                    />
                    {errors.FinishDate && <span>{errors.FinishDate.message}</span>}
                </div>
                <div>
                    <label>Brand</label>
                    <input
                        type="text"
                        {...register("Brand", { required: "Brand is required" })}
                    />
                    {errors.Brand && <span>{errors.Brand.message}</span>}
                </div>
                <div>
                    <label>Country</label>
                    <input
                        type="text"
                        {...register("Country", { required: "Country is required" })}
                    />
                    {errors.Country && <span>{errors.Country.message}</span>}
                </div>
                <div>
                    <label>Active</label>
                    <input
                        type="checkbox"
                        {...register("Active")}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Campaign;
