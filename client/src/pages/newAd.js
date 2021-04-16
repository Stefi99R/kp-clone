import * as React from 'react';
import { useForm } from 'react-hook-form';
import { createAd } from '../services/ads';
import { useHistory } from 'react-router-dom';

export function NewAd() {

    const history = useHistory();

    const getFormValues = React.useCallback(
        () => ({
            url: "URL of the image of the product",
            name: "Name of the ad",
            description: "Description for the ad",
            price: "Price for the ad",
            city: "Place from which the product is being delivered",
        }),
    );

    const defaultValues = React.useMemo(() => getFormValues(), [
        getFormValues,
    ]);

    const { register, handleSubmit } = useForm({
        defaultValues,
        mode: 'onSubmit'
    });

    const newAd = async({
        url,
        name,
        description,
        price,
        category,
        city
    }) => {
        const requestData = {
            url,
            name,
            description,
            price,
            category,
            city
        }
        await createAd(requestData);
        history.push(`/`);
    }

    return (
        <form onSubmit={handleSubmit(newAd)} noValidate>
            <div>
                <label htmlFor="url">Image URL</label>
                <input
                id="url"
                name="url"
                type="text"
                {...register('url')}

                />
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input
                id="name"
                name="name"
                type="text"
                {...register('name')}
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input
                id="description"
                name="description"
                type="text"
                {...register('description')}
                />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input
                id="price"
                name="price"
                type="text"
                {...register('price')}
                />
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <input
                id="category"
                name="category"
                type="text"
                {...register('category')}
                />
            </div>
            <div>
                <label htmlFor="city">From</label>
                <input
                id="city"
                name="city"
                type="text"
                {...register('city')}
                />
            </div>
            <button type="submit">
                Create a new Ad
            </button>
        </form>
    );
}