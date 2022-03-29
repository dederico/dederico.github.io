import React from 'react';
import PropTypes from 'prop-types';
import ShowCard from './ShowCard';
import favicon from '../assets/1x/movie.png'

const Home = ({ shows }) => {
    console.log('En Home:', shows);
    // shows.show
    // show.name
    // show.image.medium
    // show.summary
    const showResults = () => {
        return shows.map(showObject => {
            const { show } = showObject

            return <ShowCard 
                key={show.id}
                id={show.id}
                image={
                    show.image
                        ? show.image.medium
                        : ''
                }
                summary={show.summary}
                name={show.name} />
        });



    }
    return (
        <>
            {
                shows.length > 0
                    ?
                    showResults()
                    : <main>
                        <h1>Find your favorite movie!</h1>
                        <h1>
                            <img src={favicon} alt="Devflix" />
                        </h1>
                    </main>

            }


        </>
    )
}

Home.propTypes = {
    shows: PropTypes.array.isRequired,
}
export default Home;