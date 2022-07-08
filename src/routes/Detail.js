import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const getDetails = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await response.json();
    console.log(json.data.movie);
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getDetails();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <Link
            to="/"
            style={{
              display: "inline",
            }}
          >
            Back
          </Link>
          <h1
            style={{
              display: "inline",
            }}
          >
            {movie.title}
          </h1>
          <img
            style={{
              display: "block",
            }}
            src={movie.large_cover_image}
            alt={movie.title}
          />
          <h2>Genres</h2>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
          <h2>Description</h2>
          <p>{movie.description_full}</p>
          <h2>Trailer</h2>
          {movie.yt_trailer_code === "" ? (
            <h3>No Trailer</h3>
          ) : (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      )}
    </div>
  );
}

export default Detail;
