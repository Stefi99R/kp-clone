import * as React from 'react';

import '../assets/styles/ads.css';

//import { UserContext } from '../contexts/UserContext';

export function Ads() {

    const [ category, setCategory ] = React.useState('');


    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    };

    return (
        <div>
            <h1>Ads</h1>
            <ul>
                <li>
                    <select value={category} onChange={handleCategoryChange}>
                        <options value="" disabled>Choose a category:</options>
                        <options value="clothing">Clothing</options>
                        <options value="tools">Tools</options>
                        <options value="sports">Sports</options>
                        <options value="accessories">Accessories</options>
                        <options value="furniture">Furniture</options>
                        <options value="pets">Pets</options>
                        <options value="games">Games</options>
                        <options value="books">Books</options>
                        <options value="technology">Technology</options>
                    </select>
                </li>
            </ul>
        </div>
    );
}