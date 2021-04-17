import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useAd } from '../hooks/useAds';
import { useForm } from 'react-hook-form';
import { updateAd } from '../services/ads';
import { useHistory } from 'react-router-dom';

export function EditAd() {

    const { id } = useParams();
    const { status, data: ad, error, isFetching } = useAd(id);
    const history = useHistory();

    const getFormValues = React.useCallback(
        () => ({
            ...ad,
            url: ad?.url,
            name: ad?.name,
            description: ad?.description,
            price: ad?.price,
            city: ad?.city,
            createdAt: ad?.createdAt,
        }),
        [
            ad
        ]
    );

    const defaultValues = React.useMemo(() => getFormValues(ad), [
        getFormValues,
        ad,
    ]);

    const { register, handleSubmit, reset } = useForm({
        defaultValues,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        nativeValidation: false,
    });

    React.useEffect(() => reset(defaultValues), [defaultValues])

    const editAd = async ({
        url,
        name,
        description,
        price,
        category,
        city
    }) => {
        const requestData = {
            id,
            url,
            name,
            description,
            price,
            category,
            city
        }
        await updateAd(requestData);
        history.push(`/`);
    };

    return (
        <div>
            <div>
            {status === "loading" ? (
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status" style={{marginTop: 200 + 'px'}}>
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : status === "error" ? (
                <div class="alert alert-danger" role="alert">
                        Error: {error}
                    </div>
            ) : (
                <>
                <form onSubmit={handleSubmit(editAd)} noValidate>
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
                        Edit
                    </button>
                </form>
                <div>{isFetching ? "Background Updating..." : " "}</div>
                </>
            )}
            </div>
        </div>
    );
};
