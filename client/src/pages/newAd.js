import * as React from 'react';
import { useForm } from 'react-hook-form';
import { createAd } from '../services/ads';
import { useHistory } from 'react-router-dom';

function NewAd() {

    const history = useHistory();
    const [ isSubmitting, setIsSubmitting ] = React.useState(false);
    const [ category, setCategory ] = React.useState('');

    const getFormValues = React.useCallback(
        () => ({
            url: "",
            name: "",
            description: "",
            price: "",
            city: "",
        }),
    );

    const defaultValues = React.useMemo(() => getFormValues(), [
        getFormValues,
    ]);

    const handleCategoryChange = (event) => {
        
        setCategory(event.target.value);
    }

    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues,
        mode: 'onSubmit'
    });

    const newAd = async({
        url,
        name,
        description,
        price,
        city
    }) => {
        try {
            setIsSubmitting(true);

            const requestData = {
                url,
                name,
                description,
                price,
                category,
                city
            }
            await createAd(requestData);
        } catch(error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
            history.push(`/`);
        }
    }

    return (
        <>
        <form className="row g-3 col-md-8" style={{margin: '0 auto'}} onSubmit={handleSubmit(newAd)}>
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
                    <select onChange={handleCategoryChange} value={category} className="form-select" required>
                        <option value="" disabled>Choose a category:</option>
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
            <div>
                <button 
                type="submit" 
                className="btn btn-primary btn-lg btn-block" 
                disabled={isSubmitting}
                style={{justifyContent: 'center', alignItems: 'center', width: '100%', margin: '0 auto'}}>Add my ad</button>
            </div>
        </form>
        </>
    );
}

export { NewAd };
