const MoviesList = (props) => {
    const FavComp = props.favComponent;
    return (
        <>
            {
                props.movies.map((movie, index) => {
                    console.log(movie)
                    return <div className="image-container d-flex justify-content-start m3">

                        <img src={movie.Poster} alt="" />

                        <div className="overlay d-flex aligh-items-center justify-content-center"
                            onClick={() => { props.handleFavClick(movie) }}>
                                <FavComp />
                        </div>
            
                    </div>
                })
            }
        </>
    );
}

export default MoviesList;