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
  const [details, setDetails] = useState({});
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
        <div className={css.container}>
          <img className={css.img} src={poster_path} alt={title} />
          <div className={css.list}>
            <ul>
              <li>
                <h2 className={css.title}>
                  {title} ({release_date})
                </h2>
              </li>
              <li>
                <p className={css.text}>User Score:</p>
              </li>
              <li>
                <p className={css.text}>
                  Overview:
                  {overview}
                </p>
              </li>
              <li>
                <p className={css.text}>
                  Genres:
                  {genres.map((genre) => (
                    <span key={genre.id}>{genre.name} </span>
                  ))}
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
