import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
// Components
import Show from './components/Show'
import Home from './components/Home';


function Routes({ shows }) {
    return (
        <>
            <Route exact path="/">
                <div className="container pt-4">
                    <Home shows={shows} />
                </div>
            </Route>

            <Route exact path="/shows/:idShow">
                <div className="container pt-4">
                    <Show />
                </div>
            </Route>
        </>

    )
}
Routes.propTypes = {
    shows: PropTypes.array.isRequired,
}
export default Routes;