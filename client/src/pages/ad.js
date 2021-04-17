import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { useAd } from '../hooks/useAds';
import { removeAd } from '../services/ads';
import { useHistory } from 'react-router-dom';

export function Ad() {

    const { id } = useParams()
    const { status, data, error, isFetching } = useAd(id);
    const history = useHistory();
    const [ category, setCategory ] = React.useState('');

    console.log(data)
    

    const deleteAd = async (id) => {
        await removeAd(id);
        history.push('/');
    }

    const { user } = React.useContext(UserContext);
    
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
                    <span>Error: {error.message}</span>
                ) : (
                    <>


                <div class="card">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src={data.url} class="card-img-top" alt="" width="300" height="350"/>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <form class="row g-3">
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <label for="name" class="form-label">{data.name}</label>
                                                    <input type="text" class="form-control" id="name" value={data.name} />
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="price" class="form-label">Price (USD)</label>
                                                    <input type="number" class="form-control" id="price" value={data.price} disabled />
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-md-4">
                                                    <label for="category" class="form-label">{data.category}</label>

                                                    <select id="category" class="form-select" value={data.category} disabled>
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
                                                <div class="col-md-4">
                                                    <label for="name" class="form-label">Posted by</label>
                                                    <input type="text" class="form-control" id="user" value={data.User.username}/>
                                                </div>
                                                <div class="col-md-4">
                                                    <label for="city" class="form-label">City</label>
                                                    <input type="text" class="form-control" id="city" value={data.city} />
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-md-12">
                                                    <label for="description" class="form-label">Description</label>
                                                    <textarea class="form-control" id="description" rows="3" disabled>{data.description}
                                                    </textarea>
                                                </div>
                                            </div>
                                            {user?.id === data.userId ? (
                                                <div class="col-12">
                                                    <button type="submit" class="btn btn-warning">Edit</button>
                                                    <button type="button" class="btn btn-danger mx-1">Delete</button>
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



                        {/* <div>
                            <h1>{data.name}</h1>
                            <div>
                                <img src={data.url} alt="image_ad"/>
                                <p>{data.name}</p>
                                <p>Price: ${data.price}</p>
                                <p>Viewed: {data.count} times.</p>
                                <p>Category: {data.category}</p>
                                <p>From: {data.city}</p>
                            </div>
                            <div>
                                <h2>Username: {data.User.username}</h2>
                                <p>User's phone number: {data.User.phone}</p>
                            </div>
                        </div>
                        <div>
                             (<Link to={`/ad/edit/${id}`}>Edit</Link>)
                            {user?.id === data.userId ? <button onClick={() => deleteAd(id)}>Delete</button> : ""}
                        </div>
                         */}
                    </>
                )}
            </div>
        </div>
    );
};