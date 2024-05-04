// import { NavLink } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { useEffect, useState } from "react";
import { getFilmDetails } from "../../trending-api";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useParams } from "react-router-dom";

export default function MovieDetailsPage() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState([]);
  const { filmId } = useParams();

  const { poster_path, title, overview, release_date, genres } = details;
  console.log(details);

  useEffect(() => {
    const getFilms = async () => {
      try {
        setLoader(true);
        const newDetail = await getFilmDetails(filmId);
        setDetails(newDetail);

        console.log(newDetail);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getFilms();
  }, [filmId]);

  if (!details) {
    return;
  }

  return (
    <>
      {loader && <Loader />}
      {error && <Error />}
      {details && (
        <div>
          <img
            className={css.img}
            src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
            alt={title}
            width="150"
          />
          <div>
            <h2>{title}</h2>
            <p>{release_date}</p>
            <h3>User score: %</h3>
            <h3>Overview</h3>
            <p>{overview}</p>
            <h3>Genres</h3>
            <ul className={css.genre}>
              {genres.map((ganre) => (
                <li key={ganre.id}>{ganre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
