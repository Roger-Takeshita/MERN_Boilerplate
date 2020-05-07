import React from 'react';
import Navbar from '../Navbar/Navbar';

function Head({ history }) {
    return (
        <header>
            <Navbar history={history} />
        </header>
    );
}

export default Head;
