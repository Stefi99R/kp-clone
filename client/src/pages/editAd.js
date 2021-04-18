import * as React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useAd } from '../hooks/useAds';
import { useForm } from 'react-hook-form';
import { updateAd } from '../services/ads';
import { useHistory } from 'react-router-dom';
import { parseJwt } from '../services/auth';

function EditAd() {

    const { id } = useParams();
    const { status, data: ad, error, isFetching } = useAd(id);
    const history = useHistory();

    const getFormValues = React.useCallback(
        () => ({
            ...ad,
            url: ad?.url,
            name: ad?.name,
            description: ad?.description,
            category: setCategoryNew(ad?.category),
            price: ad?.price,
            city: ad?.city,
            createdAt: ad?.createdAt,
        }),
        [
            ad
        ]
    );

    const [ categoryNew , setCategoryNew ] = React.useState('');
    const [ isSubmitting, setIsSubmitting ] = React.useState(false);

    const defaultValues = React.useMemo(() => getFormValues(ad), [
        getFormValues,
        ad,
    ]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
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
        city
    }) => {
        setIsSubmitting(true);
        const requestData = {
            id,
            url,
            name,
            description,
            category: categoryNew,
            price,
            city
        }
        await updateAd(requestData);
        setIsSubmitting(false);
        history.push(`/`);
    };

    const handleCategoryChange = async (event) => {
        await setCategoryNew(event.target.value)
    }

    return (
        <>
        {status === "loading" ? (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status" style={{marginTop: 200 + 'px'}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ) : status === "error" ? (
            <div className="alert alert-danger" role="alert">
                    Error: {error}
                </div>
        ) : (
        <>
        <form className="row g-3 col-md-8" style={{margin: '0 auto'}} onSubmit={handleSubmit(editAd)}>
            <div className="col-md-6">
                <label htmlFor="name" className="form-label">Name of the product</label>
                <input id="name"
                        name="name"
                        type="text"
                        {...register('name', {required: true, minLength: 4, maxLength: 25})} 
                        className="form-control"
                        placeholder="Name of the ad..."/>
                        <span style={{color: 'red'}}>{errors.name && "Please enter a valid product name (4-25 characters)"}</span>
            </div>
            <div className="col-md-6">
                <label htmlFor="url" className="form-label">URL of the image for the product</label>
                <input id="url"
                        name="url"
                        type="text"
                        {...register('url')} 
                        className="form-control"
                        placeholder="URL of the image of the product..."/>
            </div>
            <div className="col-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea 
                className="form-control" 
                aria-label="With textarea" 
                id="description"
                name="description"
                type="text"
                {...register('description')}
                placeholder="Description of the ad..."></textarea>
            </div>
            <div className="col-md-6">
                <label htmlFor="city" className="form-label">City</label>
                <input id="city"
                    name="city"
                    type="text"
                    {...register('city', {required: true, max: 100})} 
                    className="form-control"
                    placeholder="Place from which the product is being delivered..."/>
                    <span style={{color: 'red'}}>{errors.city && "Please enter the city from which the product will be delivered. (up to 100 characters)"}</span>
            </div>
            <div className="col-md-3">
                <label htmlFor="category" className="form-label">Category</label>
                    <select onChange={handleCategoryChange} value={categoryNew} className="form-select" required>
                        <option value="clothing">clothing</option>
                        <option value="tools">tools</option>
                        <option value="sports">sports</option>
                        <option value="accessories">accessories</option>
                        <option value="furniture">furniture</option>
                        <option value="pets">pets</option>
                        <option value="games">games</option>
                        <option value="books">books</option>
                        <option value="technology">technology</option>
                    </select>
            </div>
            <div className="col-md-3">
                <label htmlFor="price" className="form-label">Price (USD)</label>
                <input id="price"
                        name="price"
                        type="text"
                        {...register('price', {required: true})} 
                        className="form-control"
                        placeholder="Price in USD..."/>
                        <span style={{color: 'red'}}>{errors.price && "Please enter the price for the product."}</span>
            </div>
            { ad.User.username === parseJwt()?.username ? (
                <div>
                    <button 
                    type="submit" 
                    className="btn btn-primary btn-lg btn-block" 
                    disabled={isSubmitting}
                    style={{justifyContent: 'center', alignItems: 'center', width: '100%', margin: '0 auto'}}>Update my ad</button>
                </div>
            ) : (
                <Redirect to="/"/>
            )}
            
        </form>
        <div>{isFetching ? "Background Updating..." : " "}</div>
        </>)}
    </>
    );
};

export { EditAd };

