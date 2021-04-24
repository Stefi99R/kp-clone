import Cookies from 'js-cookie';
import * as React from 'react';
import { useQuery } from 'react-query';
import { privateApi } from '../config/axios-instance';
import '../assets/styles/ads.css';
import { useHistory } from 'react-router-dom';
import 'bootstrap';
import debounce from 'lodash.debounce';
import { parseJwt } from '../services/auth';
import { removeAd } from '../services/ads';

function Ads() {

    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [onlyMe, setOnlyMe] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [inputSearch, setInputSearch] = React.useState('');
    const [offset, setOffset] = React.useState(0);
    const history = useHistory();

    const {
        status,
        data,
        error,
        isFetching,
    } = useQuery(['ads', [onlyMe, price, category, search, offset]], () => filter(onlyMe, price, category, search, offset), { keepPreviousData: false });

    //var temp_query = ''
    const filter = async (onlyMe, price, category, search) => {

        let query = '/ads?';

        let where = {
            search: '',
            onlyMe: false,
            price: '',
            category: ''
        };

        if (search !== '') {
            where.search = 'search=' + search;
        }
        if (onlyMe) {
            where.onlyMe = 'onlyMe=' + parseJwt().id;
        }
        if (price !== '') {
            let asc = 'asc';
            if (price === 'min') {
                asc = 'asc=false'
            }
            where.price = '' + asc + '&price=' + price;
        }
        if (category !== '') {
            where.category = 'category=' + category;
        }

        for (const [key, value] of Object.entries(where)) {
            query += `${value}&`;
        }
        
        query += `offset=${offset * 20}`;

        const { data } = await privateApi(query);
        return data;
    }

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

    const handleOffset = (page) => {
        setOffset(page);
    }

    const handleSearch =
        React.useCallback(debounce((event) => {
            setSearch(event.target.value);
        }, 200), []);



    const openAd = (id) => {
        history.push(`/ad/${id}`);
    }

    const editAd = (event, id) => {
        event.stopPropagation();
        history.push(`/ad/edit/${id}`);
    }

    const deleteAd = async (event, id) => {
        event.stopPropagation();
        await removeAd(id);
        window.location.reload(false);
    }

    return (

        <div>
            <>
                <div className="row">
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Enter text..." onChange={handleSearch} />
                            <button className="btn btn-info" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <select className="form-select" value={category} onChange={handleCategoryChange}>
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
                        {Cookies.get('access_token') === undefined ? (
                            <p hidden></p>
                        ) : (
                            <>
                                <div className="form-check">
                                    <input className="form-check-input" id="mine" type="checkbox" onChange={handleMine} />
                                    <label className="form-check-label">Only mine</label>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="col-md-4">
                        <select className="form-select" value={price} onChange={handlePriceFilter}>
                            <option value="" disabled>Sort by price:</option>
                            <option id="min" name="price" value="min">Ascending</option>
                            <option id="max" name="price" value="max">Descending</option>
                        </select>
                    </div>
                </div>
            </>

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
                        {data.ads.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">City</th>
                                            <th scope="col">View count</th>
                                            <th scope="col">Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.ads.map((ad) => (
                                            <tr onClick={() => openAd(ad.id)} key={ad.id}>
                                                <th scope="row">
                                                    <img src={ad.url} width="250" height="200" />
                                                </th>
                                                <td>{ad.name}</td>
                                                <td>
                                                    {ad.price} <span className="badge bg-success">$</span>
                                                </td>
                                                <td><span className="badge bg-info text-dark">{ad.category}</span></td>
                                                <td>{ad.city}</td>
                                                <td>
                                                    <span className="badge bg-dark">{ad.count} times</span>
                                                </td>
                                                {parseJwt()?.username === ad.User.username ? (
                                                    <td>
                                                        <button type="button" onClick={(e) => editAd(e, ad.id)} className="btn btn-warning" key={ad.id}>Edit</button>
                                                        <button type="button" className="btn btn-danger mx-1" onClick={(e) => deleteAd(e, ad.id)}>Delete</button>
                                                    </td>
                                                ) : (
                                                    <td></td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <nav aria-label="...">
                                    <ul className="pagination justify-content-center pagination-lg">
                                        {[...Array(data.total)].map((x, i) =>
                                            <li className="page-item" key={i}>
                                                <a className="page-link" onClick={() => handleOffset(i)}>{i + 1}</a>
                                            </li>
                                        )}
                                    </ul>
                                </nav>
                            </div>

                        ) : (
                            <div className="alert alert-warning my-5 text-center" role="alert">
                                No data to display!
                            </div>
                        )}

                    </>
                )
                }
            </div>
        </div>
    );
}

export { Ads };
