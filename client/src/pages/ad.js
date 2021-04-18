import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useAd } from '../hooks/useAds';
import { removeAd } from '../services/ads';
import { useHistory } from 'react-router-dom';
import { parseJwt } from '../services/auth';

function Ad() {

    const { id } = useParams()
    const { status, data, error, isFetching } = useAd(id);
    const history = useHistory();

    const deleteAd = async (id) => {
        await removeAd(id);
        history.push('/');
    }

    const editAd = (id) => {
        history.push(`/ad/edit/${id}`);
    }

    return (
        <div>
            <div>
                {status === "loading" ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status" style={{ marginTop: 200 + 'px' }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : status === "error" ? (
                    <div className="alert alert-danger" role="alert">
                        Error: {error}
                    </div>
                ) : (
                    <>


                        <div className="card">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={data.url} className="card-img-top" alt="" width="500" height="390" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <form className="row g-3">
                                            <div className="row mb-3 mt-3">
                                                <div className="col-md-5">
                                                    <label htmlFor="name" className="form-label">Name of the product</label>
                                                    <input type="text" className="form-control" id="name" value={data.name} readOnly />
                                                </div>
                                                <div className="col-md-3">
                                                    <label htmlFor="price" className="form-label">Price (in USD)</label>
                                                    <input type="number" className="form-control" id="price" value={data.price} readOnly />
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="phone" className="form-label">Telephone number</label>
                                                    <input type="text" className="form-control" id="phone" value={data.User.phone} readOnly />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <label htmlFor="category" className="form-label">{data.category}</label>

                                                    <select id="category" className="form-select" value={data.category} readOnly>
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
                                                <div className="col-md-4">
                                                    <label htmlFor="name" className="form-label">Posted by</label>
                                                    <input type="text" className="form-control" id="user" value={data.User.username} readOnly />
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="city" className="form-label">City</label>
                                                    <input type="text" className="form-control" id="city" value={data.city} readOnly />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-12">
                                                    <label htmlFor="description" className="form-label">Product description</label>
                                                    <textarea className="form-control" id="description" rows="3" value={data.description} readOnly>
                                                    </textarea>
                                                </div>
                                            </div>
                                            {parseJwt()?.username === data.User.username ? (
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-warning" onClick={(e) => editAd(id)}>Edit</button>
                                                    <button type="button" className="btn btn-danger mx-1" onClick={() => deleteAd(id)}>Delete</button>
                                                </div>
                                            ) : (
                                                <p hidden></p>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>{isFetching ? "Background Updating..." : ""}</div>
                    </>
                )}
            </div>
        </div>
    );
};

export { Ad };
