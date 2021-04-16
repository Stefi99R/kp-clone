import Cookies from 'js-cookie';
import * as React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import '../assets/styles/ads.css';
import { privateApi } from '../config/axios-instance';
import { UserContext } from '../contexts/UserContext';

export function Ads() {

    const [price, setPrice ] = React.useState('');
    const [ category, setCategory ] = React.useState('');
    const [ onlyMe, setOnlyMe ] = React.useState(false);
    const [ search, setSearch ] = React.useState('');
    const [ inputSearch, setInputSearch ] = React.useState('');

    const { user } = React.useContext(UserContext);

    const [ page, setPage ] = React.useState(10);

    const filter = async (onlyMe, price, category, search) => {
        if (onlyMe) {
            setPrice('');
            const { data } = await privateApi('/ads?onlyMe=' + user.id);
            return data;
        }
        if (price !== '') {
            let asc = 'asc';
            if (price === 'min') {
                asc = 'asc=false'
            }
            const { data } = await privateApi('/ads?' + asc + '&price=' + price)
            return data;
        }
        if (category !== '') {
            setPrice('');
            const { data } = await privateApi('/ads?category=' + category);
            return data;
        }
        if (search !== '') {
            setPrice('');
            const { data } = await privateApi('/ads?search=' + search);
            return data;
        }
        const { data } = await privateApi('/ads');
        return data;
    }

    const {
        status,
        data,
        error,
        isFetching,
    } = useQuery(['ads', [onlyMe, price, category, search]], () => filter(onlyMe, price, category, search), { keepPreviousData: false});

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    };

    const handleMine = () => {
        setOnlyMe(!onlyMe);
    }

    const handlePriceFilter = (event) => {
        setPrice(event.target.value);
    }

    const handleSearchInput = (event) => {
        setInputSearch(event.target.value);
    }

    const handleSearch = () => {
        setSearch(inputSearch);
    }

    return (
        <div>
            <h1>Ads</h1>
            <ul>
                <li>
                    <select value={category} onChange={handleCategoryChange}>
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
                </li>
                <li>
                    <input placeholder="Search..." onChange={handleSearchInput}/>
                    <button type="button" onClick={handleSearch}>Search</button>
                </li>
                <li>
                    <label htmlFor="min">From lower to higher</label>
                    <input type="radio" id="min" name="price" value="min" onChange={handlePriceFilter}/>
                    <label htmlFor="max">From higher to lower</label>
                    <input type="radio" id="max" name="price" value="max" onChange={handlePriceFilter}/>
                </li>
                {Cookies.get('access_token') === undefined ? (
                    <p hidden></p>
                ) : (
                    <li>
                        <label htmlFor="mine">Only mine</label>
                        <input type="checkbox" id="mine" onChange={handleMine}></input>
                    </li>
                )}
                <li>
                    <button type="button" onClick={() => {setPage(page + 10)}}>more</button>
                </li>
            </ul>
            <div>
                { status === "loading" ? (
                    "Loading..."
                ) : status === "error" ? (
                    <span>Error: {error}</span>
                ) : (
                    <>
                        <div>
                            {data.map((ad) => (
                                <Link to={`/ad/${ad.id}`} className="ad" key={ad.id}>
                                    <img src={ad.url} alt="image_ad"/>
                                    <p>{ad.name}</p>
                                    <p>Price: {ad.price}</p>
                                    <p>Viewed: {ad.count} times</p>
                                    <p>Category: {ad.category}</p>
                                    <p>From: {ad.city}</p>
                                </Link>
                            ))}
                        </div>
                        <div>{isFetching ? "Background Updating..." : ""}</div>
                    </>
                )
            }
            </div>
        </div>
    );
}