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

    const deleteAd = async (id) => {
        await removeAd(id);
        history.push('/');
    }

    const { user } = React.useContext(UserContext);
    
    return (
        <div>
            <div>
                {status === "loading" ? (
                    "Loading..."
                ) : status === "error" ? (
                    <span>Error: {error.message}</span>
                ) : (
                    <>
                        <div>
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
                            {user?.id === data.userId ? (<Link to={`/ad/edit/${id}`}>Edit</Link>) : ""}
                            {user?.id === data.userId ? <button onClick={() => deleteAd(id)}>Delete</button> : ""}
                        </div>
                        <div>{isFetching ? "Background Updating..." : ""}</div>
                    </>
                )}
            </div>
        </div>
    );
};